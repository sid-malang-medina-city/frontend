import { mapActions } from 'pinia'
import { laporanProgresPembangunanStore } from '~/store/teknik/laporan-progres-pembangunan'
import { SPKStore } from '~/store/teknik/spk'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'
import helpers from '~/utils/helpers'
import { STATUSES } from '~/data/lpp'

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
  name: 'manajemen-laporan-progres-pembangunan-create',

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
        spk: '',
        tanggal: '',
        status: '',
        pajak: '',
        keterangan: '',
        termin: null,
        harga_bulan_ini_pembulatan: null,
        potongan_biofil: null,
        task_force: null,
        jenis_pekerjaans: []
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
      keyForMonthPicker: '',
      templateLaporanProgresPembangunanId: null,
      templateLaporanProgresPembangunans: [],
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
      const requiredFields = ['spk', 'tanggal', 'status', 'pajak']
      return requiredFields.every(field => !!this.formData[field])
    },
    isSubmitButtonDisabled () {
      return !this.isAllRequiredFieldsFilled || this.hargaInputInvalid
    },
    totalPrice () {
      let price = 0
      this.formData.jenis_pekerjaans.forEach(jenisPekerjaan => {
        price += jenisPekerjaan.children.reduce((harga, pekerjaan) => {
          return harga + parseInt(pekerjaan.harga_total)
        }, 0)
      })
      return price
    },
    totalHargaBulanIni () {
      let totalHargaBulanIni = 0
      this.formData.jenis_pekerjaans.forEach(jenisPekerjaan => {
        jenisPekerjaan.pekerjaans.forEach(pekerjaan => {
          totalHargaBulanIni += parseFloat(pekerjaan.harga_bulan_ini.toString().replace(',', '.'))
        })
      })
      return totalHargaBulanIni.toString().replaceAll('.', ',')
    }
  },

  created () {
    this.getSPKs()
  },

  methods: {
    ...mapActions(laporanProgresPembangunanStore, ['createLaporanProgresPembangunan']),
    ...mapActions(SPKStore, ['fetchSPKs', 'fetchSPK']),

    async getSPKs () {
      try {
        const { data } = await this.fetchSPKs({
          skip_pagination: true,
          lpp_creatable: true
        })
        this.SPKs = JSON.parse(JSON.stringify(data))
        this.visibleLoading.spkDropdown = false
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToManajemenLaporanProgresPembangunan () {
      this.redirectTo('ManajemenLaporanProgresPembangunan')
    },

    async getSPK () {
      this.visibleLoading.table = true
      try {
        const { data } = await this.fetchSPK(this.selectedSPKId)
        this.keyForMonthPicker = 'keyMonth'
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
        spk: data.id
      }
      // this.formData = {
      //   ...this.formData,
      //   ...data,
      //   spk: data.id
      // }
      this.formData.jenis_pekerjaans.forEach((jenisPekerjaan, jenisPekerjaanIndex) => {
        jenisPekerjaan.jenis_pekerjaan = jenisPekerjaan.id
        jenisPekerjaan.id_table = (jenisPekerjaanIndex + 1).toString()
        jenisPekerjaan.actions = true
        delete jenisPekerjaan.id
        jenisPekerjaan.pekerjaans.forEach((pekerjaan, pekerjaanIndex) => {
          delete pekerjaan.id
          pekerjaan.id_table = (jenisPekerjaanIndex + 1).toString() + (jenisPekerjaanIndex + 1).toString() + (pekerjaanIndex + 1).toString(),
          pekerjaan.harga_bulan_ini = 0
          pekerjaan.persentase_progres_bulan_ini = 0
          pekerjaan.harga_progres_total = pekerjaan.harga_progres_sebelumnya
          pekerjaan.persentase_progres_total = pekerjaan.persentase_progres_sebelumnya
          pekerjaan.error = false
        })
        jenisPekerjaan.harga_total = this.calculateHargaTotalJenisPekerjaan(jenisPekerjaan.pekerjaans)
        jenisPekerjaan.children = [...jenisPekerjaan.pekerjaans]
      })
      this.calculatePersentasePekerjaan()
    },

    calculateHargaTotalJenisPekerjaan (pekerjaans) {
      return pekerjaans.reduce((harga, pekerjaan) => {
        return harga + parseInt(pekerjaan.harga_total)
      }, 0)
    },

    addPekerjaan () {
      if (!this.form.pekerjaans.some(pekerjaan => pekerjaan.nama === this.namaPekerjaan)) {
        this.form.pekerjaans.push({
          id_table: (this.formData.jenis_pekerjaans.length + 1).toString() + (this.formData.jenis_pekerjaans.length + 1).toString() + (this.form.pekerjaans.length + 1).toString(),
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

    resetFormPekerjaan () {
      this.clearPekerjaan()
      this.form = {
        jenisPekerjaan: '',
        pekerjaans: []
      }
    },

    deleteAllPekerjaan () {
      this.form.pekerjaans = []
    },

    deletePekerjaan (namaPekerjaan) {
      this.form.pekerjaans.splice(this.form.pekerjaans.findIndex(pekerjaan => pekerjaan.nama === namaPekerjaan), 1)
    },

    addJenisPekerjaan () {
      if (!this.formData.jenis_pekerjaans.some(jenisPekerjaan => jenisPekerjaan.nama === this.form.jenisPekerjaan)) {
        const jenisPekerjaanRow = {
          id_table: this.formData.jenis_pekerjaans.length + 1,
          nama: this.form.jenisPekerjaan,
          actions: true,
          children: this.form.pekerjaans,
          harga_total: this.calculateHargaTotalJenisPekerjaan(this.form.pekerjaans)
        }
        this.formData.jenis_pekerjaans.push(jenisPekerjaanRow)
        this.calculatePersentasePekerjaan()
        this.showToast('Pekerjaan berhasil ditambahkan!')
        this.toggleDrawer()
        this.resetFormPekerjaan()
      } else {
        this.showToast('Jenis pekerjaan sudah ada', 'error')
      }
    },

    updateJenisPekerjaan () {
      if (!this.formData.jenis_pekerjaans.some(jenisPekerjaan => jenisPekerjaan.nama === this.form.jenisPekerjaan) || this.form.jenisPekerjaan === this.form.currentJenisPekerjaan) {
        const updateIndex = this.formData.jenis_pekerjaans.findIndex(jenisPekerjaan => jenisPekerjaan.nama === this.form.currentJenisPekerjaan)
        this.formData.jenis_pekerjaans.splice(updateIndex, 1, {
          ...this.formData.jenis_pekerjaans[updateIndex],
          nama: this.form.jenisPekerjaan,
          children: this.form.pekerjaans,
          harga_total: this.calculateHargaTotalJenisPekerjaan(this.form.pekerjaans)
        })
        this.calculatePersentasePekerjaan()
        this.showToast('Pekerjaan berhasil diubah!')
        this.toggleDrawer()
        this.resetFormPekerjaan()
      } else {
        this.showToast('Jenis pekerjaan sudah ada', 'error')
      }
    },

    calculatePersentasePekerjaan () {
      this.formData.harga_total = 0
      this.formData.jenis_pekerjaans.forEach(jenisPekerjaan => {
        jenisPekerjaan.children.forEach(pekerjaan => {
          pekerjaan.persentase_pekerjaan = (pekerjaan.harga_total/this.totalPrice)*100
          this.formData.harga_total += pekerjaan.harga_total
        })
      })
    },

    deleteJenisPekerjaan (selectedJenisPekerjaan) {
      this.formData.jenis_pekerjaans.splice(this.formData.jenis_pekerjaans.findIndex(jenisPekerjaan => jenisPekerjaan.nama === selectedJenisPekerjaan), 1)
      this.calculatePersentasePekerjaan()
      this.showToast('Pekerjaan berhasil dihapus!')
    },

    handleDateRangeChange () {
      this.formData.awal_periode = this.periodeValue[0]
      this.formData.akhir_periode = this.periodeValue[1]
    },

    handleHargaBulanIniChange (row) {
      const tempPersentaseProgresTotal = row.persentase_progres_sebelumnya + (parseFloat(row.harga_bulan_ini.replace(',', '.'))/parseFloat(row.harga_total))*100
      if (tempPersentaseProgresTotal > 100.1) {
        if (!row.error) {
          this.showToast('Harga bulan ini melebihi harga total', 'error')
          row.error = true
          this.hargaInputInvalid = true
        }
      } else {
        row.error = false
        this.hargaInputInvalid = false
      }

      if (row.harga_bulan_ini === '') {
        row.persentase_progres_bulan_ini = 0
        row.harga_progres_total = row.harga_progres_sebelumnya
        row.persentase_progres_total = row.persentase_progres_sebelumnya
        return
      }
      row.persentase_progres_bulan_ini = (parseFloat(row.harga_bulan_ini.replace(',', '.'))/parseFloat(row.harga_total))*100
      row.harga_progres_total = parseFloat(row.harga_progres_sebelumnya) + parseFloat(row.harga_bulan_ini.replace(',', '.'))
      row.persentase_progres_total = row.persentase_progres_sebelumnya + row.persentase_progres_bulan_ini
    },

    handlePersentaseBulanIniChange (row) {
      row.persentase_progres_bulan_ini = parseFloat(row.persentase_progres_bulan_ini)
      
      let hargaBulanIni = (row.persentase_progres_bulan_ini / 100) * row.harga_total
      if (!row.persentase_progres_bulan_ini) {
        row.persentase_progres_bulan_ini = 0
        hargaBulanIni = 0
      }
      
      row.harga_bulan_ini = hargaBulanIni.toString().replaceAll('.', ',')

      row.harga_progres_total = parseFloat(row.harga_progres_sebelumnya) + parseFloat(row.harga_bulan_ini.replace(',', '.'))
      row.persentase_progres_total = row.persentase_progres_sebelumnya + row.persentase_progres_bulan_ini

      if (row.persentase_progres_total > 100.1) {
        if (!row.error) {
          this.showToast('Harga bulan ini melebihi harga total', 'error')
          row.error = true
          this.hargaInputInvalid = true
        }
      } else {
        row.error = false
        this.hargaInputInvalid = false
      }
    },

    calculateHargaBulanIni () {
      let totalHargaBulanIni = 0
      this.formData.jenis_pekerjaans.forEach(jenisPekerjaan => {
        jenisPekerjaan.pekerjaans.forEach(pekerjaan => {
          pekerjaan.harga_bulan_ini = parseFloat(pekerjaan.harga_bulan_ini.toString().replace(',', '.'))
          totalHargaBulanIni += pekerjaan.harga_bulan_ini
        })
      })
      
      // harga dan persentase sebelumnya dari data SPK
      this.formData.persentase_progres_sebelumnya = this.formData.persentase_progres_total
      this.formData.persentase_progres_bulan_ini = (totalHargaBulanIni/this.formData.harga_total)*100
      this.formData.persentase_progres_total += this.formData.persentase_progres_bulan_ini
      this.formData.harga_progres_sebelumnya = this.formData.harga_progres_total
      this.formData.harga_bulan_ini = totalHargaBulanIni
      this.formData.harga_progres_total += totalHargaBulanIni
    },

    async submit () {
      this.visibleLoading.submitButton = true
      this.calculateHargaBulanIni()
      this.formData.pajak = parseFloat(this.formData.pajak)
      this.formData.potongan_biofil = this.formData.potongan_biofil === "" ? 0 : parseFloat(this.formData.potongan_biofil)
      this.formData.task_force = this.formData.task_force === "" ? 0 : parseFloat(this.formData.task_force)
      this.formData.harga_bulan_ini_pembulatan = this.formData.harga_bulan_ini_pembulatan === "" ? 0 : parseFloat(this.formData.harga_bulan_ini_pembulatan)
      try {
        await this.createLaporanProgresPembangunan(this.generatePayload())
        this.redirectTo('ManajemenLaporanProgresPembangunan')
        this.showToast('Laporan Progres Pembangunan baru berhasil ditambahkan!')
      } catch (e) {
        this.showErrorResponse(e)
      } finally {
        this.visibleLoading.submitButton = false
      }
    },

    generatePayload () {
      const { ...formData} = JSON.parse(JSON.stringify(this.formData))
      formData.jenis_pekerjaans.forEach(data => {
        data.pekerjaans = [...data.children]
      })
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

    isDateInArray(date, array) {
      const formattedDate = this.formatDate(date)
      return array?.includes(formattedDate)
    },

    formatDate(date) {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      return `${year}-${month.toString().padStart(2, '0')}-01`
    },

    disabledDate(time) {
      if (!this.keyForMonthPicker) {
        return false
      }
      if (this.formData.last_tanggal_laporan_progres_pembangunan) {
        let lastTanggalLaporanProgresPembangunan = new Date(this.formData.last_tanggal_laporan_progres_pembangunan)
        lastTanggalLaporanProgresPembangunan.setMonth(lastTanggalLaporanProgresPembangunan.getMonth() + 1)
        return time.getTime() < lastTanggalLaporanProgresPembangunan.getTime() 
      }
      return !this.isDateInArray(time, this.formData.available_periode_laporan_progres_pekerjaan)
    },
  }
}
