import { mapActions } from 'pinia'
import { laporanProgresPembangunanNonUnitStore } from '~/store/teknik/laporan-progres-pembangunan-non-unit'
import { SPKNonUnitStore } from '~/store/teknik/spk-non-unit'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'
import helpers from '~/utils/helpers'
import { STATUSES } from '~/data/spk'

import receiptIcon from '/receipt.svg'
import briefcaseIcon from '/briefcase.svg'

import {
  CircleCheckFilled,
  WarningFilled,
  Plus,
  Delete,
  Download,
  Edit
} from '@element-plus/icons-vue'

const SATUAN_UKURANS = [
  'm³',
  'm²',
  'm',
  'bh',
  'ls',
  'ttk',
  'set'
]

export default {
  name: 'manajemen-laporan-progres-pembangunan-non-unit-create',

  mixins: [RouterHandler, ToastHandler],

  components: {
    CircleCheckFilled,
    WarningFilled,
    Plus,
    Download,
    PageHeader,
  },

  data () {
    return {
      formData: {
        nama: '',
        spk_non_unit: '',
        tanggal: '',
        status: '',
        keterangan: '',
        termin: null,
        start_pekerjaan: null,
        end_pekerjaan: null,
        pekerjaans: []
      },
      form: {
        jenisPekerjaan: '',
        pekerjaans: []
      },
      SPKs: [],
      selectedSPKId: null,
      namaPekerjaan: '',
      satuanUkuran: '',
      volume: '',
      hargaSatuan: '',
      keyForWeekPicker: '',
      templateLaporanProgresPembangunanNonUnitId: null,
      templateLaporanProgresPembangunanNonUnits: [],
      periodeValue: null,
      satuanUkurans: SATUAN_UKURANS,
      statuses: STATUSES,
      units: [],
      vendors: [],
      icons: {
        receipt: receiptIcon,
        briefcase: briefcaseIcon,
        delete: Delete,
        edit: Edit
      },
      isSPKFetched: false,
      visibleDrawer: false,
      visibleDialog: false,
      visibleLoading: {
        submitButton: false,
        spkDropdown: true,
        table: false
      },
      isEditMode: false,
      hargaInputInvalid: false,
      helpers
    }
  },

  computed: {
    isAllRequiredFieldsFilled () {
      const requiredFields = ['spk_non_unit', 'tanggal', 'status']
      return requiredFields.every(field => !!this.formData[field])
    },
    isSubmitButtonDisabled () {
      return !this.isAllRequiredFieldsFilled || this.hargaInputInvalid
    },
    totalPrice () {
      return this.formData.pekerjaans.reduce((harga, pekerjaan) => {
        return harga + parseInt(pekerjaan.harga_total)
      }, 0)
    }
  },

  created () {
    this.getSPKs()
  },

  methods: {
    ...mapActions(laporanProgresPembangunanNonUnitStore, ['createLaporanProgresPembangunanNonUnit']),
    ...mapActions(SPKNonUnitStore, ['fetchSPKNonUnits', 'fetchSPKNonUnit']),

    async getSPKs () {
      try {
        const { data } = await this.fetchSPKNonUnits({
          skip_pagination: true,
          lpp_creatable: true
        })
        this.SPKs = JSON.parse(JSON.stringify(data))
        this.visibleLoading.spkDropdown = false
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToManajemenLaporanProgresPembangunanNonUnit () {
      this.redirectTo('ManajemenLaporanProgresPembangunanNonUnit')
    },

    async getSPK () {
      this.visibleLoading.table = true
      try {
        const { data } = await this.fetchSPKNonUnit(this.selectedSPKId)
        this.keyForWeekPicker = 'keyWeek'
        this.initFormData(JSON.parse(JSON.stringify(data)))
        this.isSPKFetched = true
      } catch (e) {
        this.showErrorResponse(e)
      } finally {
        this.visibleLoading.table = false
      }
    },

    initFormData (data) {
      const { id, status, ...formData } = data
      this.formData = {
        ...formData,
        termin: data.nomor_progres_termin_terakhir + 1 || 1,
        spk_non_unit: data.id
      }
      this.formData.pekerjaans.forEach((pekerjaan, pekerjaanIndex) => {
        pekerjaan.pekerjaan_non_unit = pekerjaan.id
        delete pekerjaan.pekerjaan
        delete pekerjaan.id
        pekerjaan.id_table = (pekerjaanIndex + 1).toString(),
        pekerjaan.harga_minggu_ini = 0
        pekerjaan.persentase_progres_minggu_ini = 0
        pekerjaan.harga_progres_total = pekerjaan.harga_progres_sebelumnya
        pekerjaan.persentase_progres_total = pekerjaan.persentase_progres_sebelumnya
        pekerjaan.error = false
        pekerjaan.actions = false
      })
      // this.formData.harga_total = this.totalPrice
      this.calculatePersentasePekerjaan()
    },

    addPekerjaan () {
      if (!this.formData.pekerjaans.some(pekerjaan => pekerjaan.nama === this.namaPekerjaan)) {
        this.formData.pekerjaans.push({
          id_table: (this.formData.pekerjaans.length + 1).toString() + (this.formData.pekerjaans.length + 1).toString() + (this.form.pekerjaans.length + 1).toString(),
          nama: this.namaPekerjaan,
          satuan_ukuran: this.satuanUkuran,
          volume: this.volume,
          harga_satuan: this.hargaSatuan,
          harga_total: parseFloat(this.volume) * parseFloat(this.hargaSatuan),
        })
        this.clearPekerjaan()
      } else {
        this.showToast('Nama pekerjaan sudah ada', 'error')
      }
    },

    clearPekerjaan () {
      this.namaPekerjaan = ''
      this.satuanUkuran = ''
      this.volume = ''
      this.hargaSatuan = ''
    },

    deleteAllPekerjaan () {
      this.form.pekerjaans = []
    },

    deletePekerjaan (namaPekerjaan) {
      this.formData.pekerjaans.splice(this.form.pekerjaans.findIndex(pekerjaan => pekerjaan.nama === namaPekerjaan), 1)
    },

    calculatePersentasePekerjaan () {
      this.formData.harga_total = 0
      this.formData.pekerjaans.forEach(pekerjaan => {
        pekerjaan.persentase_pekerjaan = (pekerjaan.harga_total/this.totalPrice)*100
        this.formData.harga_total += pekerjaan.harga_total
      })
    },

    handleDateRangeChange () {
      this.formData.start_pekerjaan = this.periodeValue[0]
      this.formData.end_pekerjaan = this.periodeValue[1]
    },

    handleHargaMingguIniChange (row) {
      const tempPersentaseProgresTotal = row.persentase_progres_sebelumnya + (parseFloat(row.harga_minggu_ini.replace(',', '.'))/parseFloat(row.harga_total))*100
      if (tempPersentaseProgresTotal > 100.1) {
        if (!row.error) {
          this.showToast('Harga minggu ini melebihi harga total', 'error')
          row.error = true
          this.hargaInputInvalid = true
        }
      } else {
        row.error = false
        this.hargaInputInvalid = false
      }

      if (row.harga_minggu_ini === '') {
        row.persentase_progres_minggu_ini = 0
        row.harga_progres_total = row.harga_progres_sebelumnya
        row.persentase_progres_total = row.persentase_progres_sebelumnya
        return
      }
      row.persentase_progres_minggu_ini = (parseFloat(row.harga_minggu_ini.replace(',', '.'))/parseFloat(row.harga_total))*100
      row.harga_progres_total = parseFloat(row.harga_progres_sebelumnya) + parseFloat(row.harga_minggu_ini.replace(',', '.'))
      row.persentase_progres_total = row.persentase_progres_sebelumnya + row.persentase_progres_minggu_ini
    },

    handlePersentaseMingguIniChange (row) {
      row.persentase_progres_minggu_ini = parseFloat(row.persentase_progres_minggu_ini)
      
      let hargaMingguIni = (row.persentase_progres_minggu_ini / 100) * row.harga_total
      if (!row.persentase_progres_minggu_ini) {
        row.persentase_progres_minggu_ini = 0
        hargaMingguIni = 0
      }
      
      row.harga_minggu_ini = hargaMingguIni.toString().replaceAll('.', ',')

      row.harga_progres_total = parseFloat(row.harga_progres_sebelumnya) + parseFloat(row.harga_minggu_ini.replace(',', '.'))
      row.persentase_progres_total = row.persentase_progres_sebelumnya + row.persentase_progres_minggu_ini

      if (row.persentase_progres_total > 100.1) {
        if (!row.error) {
          this.showToast('Harga minggu ini melebihi harga total', 'error')
          row.error = true
          this.hargaInputInvalid = true
        }
      } else {
        row.error = false
        this.hargaInputInvalid = false
      }
    },

    calculateHargaMingguIni () {
      let totalHargaMingguIni = 0
      this.formData.pekerjaans.forEach(pekerjaan => {
        pekerjaan.harga_minggu_ini = parseFloat(pekerjaan.harga_minggu_ini.toString().replace(',', '.'))
        totalHargaMingguIni += pekerjaan.harga_minggu_ini
      })
      
      // harga dan persentase sebelumnya dari data SPK
      this.formData.persentase_progres_sebelumnya = this.formData.persentase_progres_total
      this.formData.persentase_progres_minggu_ini = (totalHargaMingguIni/this.formData.harga_total)*100
      this.formData.persentase_progres_total += this.formData.persentase_progres_minggu_ini
      this.formData.harga_progres_sebelumnya = this.formData.harga_progres_total
      this.formData.harga_minggu_ini = totalHargaMingguIni
      this.formData.harga_progres_total += totalHargaMingguIni
    },

    async submit () {
      this.visibleLoading.submitButton = true
      this.calculateHargaMingguIni()
      try {
        await this.createLaporanProgresPembangunanNonUnit(this.generatePayload())
        this.redirectTo('ManajemenLaporanProgresPembangunanNonUnit')
        this.showToast('Laporan Progres Pembangunan baru berhasil ditambahkan!')
      } catch (e) {
        this.showErrorResponse(e)
      } finally {
        this.visibleLoading.submitButton = false
      }
    },

    generatePayload () {
      const { ...formData } = JSON.parse(JSON.stringify(this.formData))
      return formData
    },

    toggleDrawer (selectedJenisPekerjaan = '') {
      if (selectedJenisPekerjaan) {
        this.isEditMode = true
        this.form = {
          currentJenisPekerjaan: selectedJenisPekerjaan,
          jenisPekerjaan: selectedJenisPekerjaan,
          pekerjaans: [...this.formData.jenis_pekerjaans.find(jenisPekerjaan => jenisPekerjaan.nama === selectedJenisPekerjaan).children]
        }
      } else {
        this.isEditMode = false
      }
      this.visibleDrawer = !this.visibleDrawer
    },

    toggleDialog () {
      this.visibleDialog = !this.visibleDialog
    },

    // isDateInArray(date, array) {
    //   const formattedDate = this.formatDate(date)
    //   return array?.includes(formattedDate)
    // },

    // formatDate(date) {
    //   const year = date.getFullYear()
    //   const month = date.getWeek() + 1
    //   return `${year}-${month.toString().padStart(2, '0')}-01`
    // },

    disabledDate (time) {
      return time.getTime() < new Date(this.formData.last_tanggal_laporan_progres_pembangunan)
    },
  }
}
