import { mapActions } from 'pinia'
import { SPKStore } from '~/store/teknik/spk'
import { templateSPKStore } from '~/store/teknik/template-spk'
import { unitStore } from '~/store/unit'
import { vendorStore } from '~/store/teknik/vendor'

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
  name: 'manajemen-spk-create',

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
        unit: '',
        awal_periode: '',
        akhir_periode: '',
        vendor: '',
        keterangan: '',
        status: 'DRAFT',
        harga_total: null,
        harga_total_ppr: 0,
        harga_ppr: 0,
        harga_subsidi: 0,
        harga_pph21: 0,
        harga_total_ppr_subsidi: 0,
        harga_total_spk: 0,
        jenis_pekerjaans: []
      },
      form: {
        jenisPekerjaan: '',
        pekerjaans: []
      },
      selectedTipeUnitNomor: null,
      namaPekerjaan: '',
      satuanUkuran: '',
      volume: null,
      hargaSatuan: '',
      templateSPKId: null,
      templateSPKs: [],
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
      visibleDrawer: false,
      visibleDialog: false,
      visibleLoading: false,
      isEditMode: false,
      helpers
    }
  },

  computed: {
    isAllRequiredFieldsFilled () {
      const requiredFields = ['unit', 'awal_periode', 'akhir_periode', 'status']
      return requiredFields.every(field => !!this.formData[field]) && this.formData.jenis_pekerjaans.length > 0
    },
    isAddPekerjaanFormIsFilled () {
      return !!this.form.jenisPekerjaan && this.form.pekerjaans.length > 0
    },
    totalPrice () {
      let price = 0
      this.formData.jenis_pekerjaans.forEach(jenisPekerjaan => {
        price += jenisPekerjaan.children.reduce((harga, pekerjaan) => {
          return harga + parseFloat(pekerjaan.harga_total)
        }, 0)
      })
      return price
    }
  },

  created () {
    this.getUnits()
    this.getVendors()
    this.getTemplateSPKs()
  },

  methods: {
    ...mapActions(SPKStore, ['createSPK']),
    ...mapActions(templateSPKStore, ['fetchTemplateSPK', 'fetchTemplateSPKs']),
    ...mapActions(unitStore, ['fetchUnits']),
    ...mapActions(vendorStore, ['fetchVendors']),

    async getTemplateSPKs () {
      try {
        const { data } = await this.fetchTemplateSPKs({
          skip_pagination: true
        })
        this.templateSPKs = JSON.parse(JSON.stringify(data))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    async getUnits () {
      try {
        const { data } = await this.fetchUnits({ skip_pagination: "True", status: 'TERJUAL' })
        this.units = JSON.parse(JSON.stringify(data))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    async getVendors () {
      try {
        const { data } = await this.fetchVendors({
          skip_pagination: true
        })
        this.vendors = JSON.parse(JSON.stringify(data))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToManajemenSPK () {
      this.redirectTo('ManajemenSPK')
    },

    async importTemplate () {
      try {
        const { data } = await this.fetchTemplateSPK(this.templateSPKId)
        this.initFormData(JSON.parse(JSON.stringify(data)))
        this.templateSPKId = null
        this.toggleDialog()
        this.showToast('Import template SPK berhasil!')
      } catch (e) {
        this.showErrorResponse(e)
      }
    },

    initFormData (data) {
      this.formData = {
        ...this.formData,
        ...data
      }
      delete this.formData.id
      this.formData.jenis_pekerjaans.forEach((jenisPekerjaan, jenisPekerjaanIndex) => {
        delete jenisPekerjaan.id
        jenisPekerjaan.id_table = (jenisPekerjaanIndex + 1).toString()
        jenisPekerjaan.actions = true
        jenisPekerjaan.pekerjaans.forEach((pekerjaan, pekerjaanIndex) => {
          delete pekerjaan.id
          pekerjaan.id_table = (jenisPekerjaanIndex + 1).toString() + (pekerjaanIndex + 1).toString()
          pekerjaan.harga_total = parseFloat(pekerjaan.volume) * parseFloat(pekerjaan.harga_satuan)
        })
        jenisPekerjaan.harga_total = this.calculateHargaTotalJenisPekerjaan(jenisPekerjaan.pekerjaans)
        jenisPekerjaan.children = [...jenisPekerjaan.pekerjaans]
      })
      this.calculatePersentasePekerjaan()
    },

    // handleHargaPPh21 () {

    // },

    calculateHargaTotalJenisPekerjaan (pekerjaans) {
      return pekerjaans.reduce((harga, pekerjaan) => {
        return harga + parseFloat(pekerjaan.harga_total)
      }, 0)
    },

    calculatePersentaseJenisPekerjaan () {
      this.formData.jenis_pekerjaans.forEach(jenisPekerjaan => {
        jenisPekerjaan.persentase_pekerjaan = jenisPekerjaan.pekerjaans.reduce((persentase, pekerjaan) => {
          return persentase + pekerjaan.persentase_pekerjaan
        }, 0)
      })
    },

    calculateHargaTotal () {
      this.formData.harga_total_ppr = parseFloat(this.formData.harga_ppr) * this.selectedTipeUnitNomor
      this.formData.harga_total_ppr_subsidi = parseFloat(this.formData.harga_total_ppr) + parseFloat(this.formData.harga_subsidi)
      this.formData.harga_total_spk = parseFloat(this.formData.harga_total_ppr_subsidi) - parseFloat(this.formData.harga_pph21)
    },

    addPekerjaan () {
      if (!this.form.pekerjaans.some(pekerjaan => pekerjaan.nama === this.namaPekerjaan)) {
        this.form.pekerjaans.push({
          id_table: (this.formData.jenis_pekerjaans.length + 1).toString() + (this.form.pekerjaans.length + 1).toString(),
          nama: this.namaPekerjaan,
          satuan_ukuran: this.satuanUkuran,
          volume: this.volume,
          harga_satuan: parseFloat(this.hargaSatuan),
          harga_satuan: this.hargaSatuan,
          harga_total: parseFloat(this.volume) * parseFloat(this.hargaSatuan.replace(',','.'))
        })
        this.clearPekerjaan()
      } else {
        this.showToast('Nama pekerjaan sudah ada', 'error')
      }
    },

    clearPekerjaan () {
      this.namaPekerjaan = ''
      this.satuanUkuran = ''
      this.volume = null
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
          pekerjaans: this.form.pekerjaans,
          harga_total: this.calculateHargaTotalJenisPekerjaan(this.form.pekerjaans),
        }
        this.formData.jenis_pekerjaans.push(jenisPekerjaanRow)
        this.calculatePersentasePekerjaan()
        this.calculatePersentaseJenisPekerjaan()
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
          pekerjaans: this.form.pekerjaans,
          harga_total: this.calculateHargaTotalJenisPekerjaan(this.form.pekerjaans)
        })
        this.calculatePersentasePekerjaan()
        this.calculatePersentaseJenisPekerjaan()
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
      this.calculatePersentaseJenisPekerjaan()
      this.showToast('Pekerjaan berhasil dihapus!')
    },

    handleDateRangeChange () {
      this.formData.awal_periode = this.periodeValue[0]
      this.formData.akhir_periode = this.periodeValue[1]
    },

    handleUnitChange (unit) {
      this.selectedTipeUnitNomor = unit.tipe.nomor
      this.calculateHargaTotal()
    },

    async submit () {
      this.visibleLoading = true
      this.calculatePersentasePekerjaan()
      try {
        await this.createSPK(this.generatePayload())
        this.redirectTo('ManajemenSPK')
        this.showToast('SPK baru berhasil ditambahkan!')
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
      this.resetFormPekerjaan()
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
    }
  }
}
