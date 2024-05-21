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
  name: 'manajemen-laporan-progres-pembangunan-non-unit-edit',

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
        termin: null,
        keterangan: '',
        pekerjaans: []
      },
      form: {
        jenisPekerjaan: '',
        pekerjaans: []
      },
      SPKNonUnits: [],
      selectedSPKNonUnit: null,
      namaPekerjaan: '',
      satuanUkuran: '',
      volume: '',
      hargaSatuan: '',
      keyForMonthPicker: '',
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
      isSPKNonUnitFetched: false,
      visibleDrawer: false,
      visibleDialog: false,
      visibleLoading: {
        submitButton: false,
        table: true
      },
      isEditMode: false,
      hargaInputInvalid: false,
      helpers
    }
  },

  computed: {
    id () {
      return this.$route.params.id
    },
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
    this.getSPKNonUnits()
    this.getLaporanProgresPembangunanNonUnit()
  },

  methods: {
    ...mapActions(laporanProgresPembangunanNonUnitStore, ['editLaporanProgresPembangunanNonUnit', 'fetchLaporanProgresPembangunanNonUnit']),
    ...mapActions(SPKNonUnitStore, ['fetchSPKNonUnits', 'fetchSPKNonUnit']),

    async getSPKNonUnits () {
      try {
        const { data } = await this.fetchSPKNonUnits({
          skip_pagination: true
        })
        this.SPKNonUnits = JSON.parse(JSON.stringify(data))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToManajemenLaporanProgresPembangunanNonUnit () {
      this.redirectTo('ManajemenLaporanProgresPembangunanNonUnit')
    },

    async getLaporanProgresPembangunanNonUnit () {
      try {
        const { data } = await this.fetchLaporanProgresPembangunanNonUnit(this.id)

        this.initFormData(JSON.parse(JSON.stringify(data)))
        this.visibleLoading.table = false
      } catch (e) {
        this.showErrorResponse(e)
      }
    },

    initFormData (data) {
      this.formData = {
        ...this.formData,
        termin: data.nomor_progres_termin_terakhir || 1,
        ...data
      }
      this.formData.pekerjaans.forEach((pekerjaan, pekerjaanIndex) => {
        pekerjaan.id_table = (pekerjaanIndex + 1).toString(),
        pekerjaan.error = false
        pekerjaan.actions = false
      })
      this.periodeValue = [
        this.formData.start_pekerjaan,
        this.formData.end_pekerjaan
      ]
      this.calculatePersentasePekerjaan()
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
      if (parseFloat(row.harga_minggu_ini.replace(',', '.')) + row.harga_progres_sebelumnya > row.harga_total) {
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

      if (parseFloat(row.harga_minggu_ini.replace(',', '.')) + row.harga_progres_sebelumnya > row.harga_total) {
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
      
      // harga dan persentase sebelumnya dari data SPKNonUnit
      this.formData.persentase_progres_minggu_ini = (totalHargaMingguIni/this.formData.harga_total)*100
      this.formData.persentase_progres_total = this.formData.persentase_progres_sebelumnya + this.formData.persentase_progres_minggu_ini
      this.formData.harga_minggu_ini = totalHargaMingguIni
      this.formData.harga_progres_total = this.formData.harga_progres_sebelumnya + totalHargaMingguIni
    },

    async submit () {
      this.visibleLoading.submitButton = true
      this.calculateHargaMingguIni()
      try {
        await this.editLaporanProgresPembangunanNonUnit(this.id, this.generatePayload())
        this.redirectTo('ManajemenLaporanProgresPembangunanNonUnit')
        this.showToast('Laporan Progres Pembangunan berhasil diubah!')
      } catch (e) {
        this.showErrorResponse(e)
      } finally {
        this.visibleLoading.submitButton = false
      }
    },

    generatePayload () {
      const { created_at, ...formData} = JSON.parse(JSON.stringify(this.formData))
      return formData
    },

    toggleDialog () {
      this.visibleDialog = !this.visibleDialog
    },

    disabledDate (time) {
      return time.getTime() < new Date(this.formData.last_tanggal_laporan_progres_pembangunan)
    },

    goToManajemenLaporanProgresPembangunanNonUnit () {
      this.redirectTo('ManajemenLaporanProgresPembangunanNonUnit')
    }
  }
}
