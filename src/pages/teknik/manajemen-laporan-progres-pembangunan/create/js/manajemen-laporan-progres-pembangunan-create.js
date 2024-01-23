import { mapActions } from 'pinia'
import { laporanProgresPembangunanStore } from '~/store/teknik/laporan-progres-pembangunan'
import { SPKStore } from '~/store/teknik/spk'

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
        jenis_pekerjaans: []
      },
      form: {
        jenisPekerjaan: '',
        pekerjaans: []
      },
      SPKs: [],
      selectedSPK: null,
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
      visibleLoading: false,
      isEditMode: false,
      helpers
    }
  },

  computed: {
    isAllRequiredFieldsFilled () {
      const requiredFields = ['spk', 'tanggal']
      return requiredFields.every(field => !!this.formData[field])
    },
    totalPrice () {
      let price = 0
      this.formData.jenis_pekerjaans.forEach(jenisPekerjaan => {
        price += jenisPekerjaan.children.reduce((harga, pekerjaan) => {
          return harga + parseInt(pekerjaan.harga_total)
        }, 0)
      })
      return price
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
          skip_pagination: true
        })
        this.SPKs = JSON.parse(JSON.stringify(data))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToManajemenLaporanProgresPembangunan () {
      this.redirectTo('ManajemenLaporanProgresPembangunan')
    },

    async getSPK () {
      try {
        const { data } = await this.fetchSPK(this.selectedSPKId)
        this.keyForMonthPicker = 'keyMonth'
        this.initFormData(JSON.parse(JSON.stringify(data)))
        this.isSPKFetched = true
      } catch (e) {
        this.showErrorResponse(e)
      }
    },

    initFormData (data) {
      this.formData = {
        ...this.formData,
        ...data,
        spk: data.id
      }
      this.formData.jenis_pekerjaans.forEach((jenisPekerjaan, jenisPekerjaanIndex) => {
        jenisPekerjaan.jenis_pekerjaan = jenisPekerjaan.id
        jenisPekerjaan.id_table = (jenisPekerjaanIndex + 1).toString()
        jenisPekerjaan.actions = true
        jenisPekerjaan.pekerjaans.forEach((pekerjaan, pekerjaanIndex) => {
          pekerjaan.pekerjaan = pekerjaan.id
          pekerjaan.id_table = (jenisPekerjaanIndex + 1).toString() + (pekerjaanIndex + 1).toString()
          pekerjaan.harga_total = parseFloat(pekerjaan.volume) * parseFloat(pekerjaan.harga_satuan)
          pekerjaan.harga_bulan_ini = 0
          pekerjaan.persentase_progres_bulan_ini = 0
          pekerjaan.harga_progres_total = pekerjaan.harga_progres_sebelumnya
          pekerjaan.persentase_progres_total = pekerjaan.persentase_progres_sebelumnya
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
          id_table: (this.formData.jenis_pekerjaans.length + 1).toString() + (this.form.pekerjaans.length + 1).toString(),
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
          pekerjaan.persentase_pekerjaan = (pekerjaan.harga_total/this.totalPrice).toFixed(2)*100
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

    async submit () {
      this.visibleLoading = true
      this.calculatePersentasePekerjaan()
      try {
        await this.createLaporanProgresPembangunan(this.generatePayload())
        this.redirectTo('ManajemenLaporanProgresPembangunan')
        this.showToast('Laporan Progres Pembangunan baru berhasil ditambahkan!')
      } catch (e) {
        this.showErrorResponse(e)
      } finally {
        this.visibleLoading = false
      }
    },

    generatePayload () {
      const { created_at, ...formData} = JSON.parse(JSON.stringify(this.formData))
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
      return !this.isDateInArray(time, this.formData.available_periode_laporan_progres_pekerjaan)
    },
  }
}
