import { mapActions } from 'pinia'
import { POSupplierStore } from '~/store/teknik/po-supplier'
import { laporanProgresPOStore } from '~/store/teknik/laporan-progres-po'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'
import helpers from '~/utils/helpers'
import { STATUSES } from '~/data/po'

import receiptIcon from '/receipt.svg'
import briefcaseIcon from '/briefcase.svg'

import {
  CircleCheckFilled,
  WarningFilled,
  Plus,
  Delete,
  Edit,
  ArrowUp,
  ArrowDown,
  MoreFilled
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
  name: 'manajemen-laporan-progres-po-edit',

  mixins: [RouterHandler, ToastHandler],

  components: {
    CircleCheckFilled,
    WarningFilled,
    Plus,
    MoreFilled,
    PageHeader,
  },

  data () {
    return {
      formData: {
        start_pekerjaan: '',
        end_pekerjaan: '',
        tanggal: '',
        termin: null,
        harga_total: null,
        status: 'DRAFT',
        harga_progres_hari_lalu: '',
        persentase_progres_hari_lalu: '',
        harga_progres_hari_ini: '',
        persentase_progres_hari_ini: '',
        persentase_progres_total: '',
        persentase_progres_total: '',
        progres_jenis_pekerjaans: []
      },
      form: {
        nama: '',
        harga_total: '',
        harga_hari_lalu: '',
        persentase_hari_lalu: '',
        harga_hari_ini: '',
        persentase_hari_ini: '',
        harga_progres_total: '',
        persentase_progres_total: ''
      },
      POSuppliers: [],
      isDataFetched: false,
      satuanUkurans: SATUAN_UKURANS,
      statuses: STATUSES,
      icons: {
        receipt: receiptIcon,
        briefcase: briefcaseIcon,
        delete: Delete,
        edit: Edit,
        arrowUp: ArrowUp,
        arrowDown: ArrowDown
      },
      visibleDrawer: false,
      visibleLoading: {
        submitButton: false,
        supplierDropdown: false
      },
      isEditMode: false,
      helpers
    }
  },

  computed: {
    id () {
      return this.$route.params.id
    },
    isAllRequiredFieldsFilled () {
      const requiredFields = {
        status: '',
        start_pekerjaan: '',
        end_pekerjaan: '',
        tanggal: '',
        termin: null
      }
      return Object.keys(requiredFields).every(key => !!this.formData[key]) && this.formData.progres_jenis_pekerjaans.length > 0
    },
    isAddJenisPekerjaanFormIsFilled () {
      const requiredFields = {
        nama: ''
      }
      return Object.keys(requiredFields).every(key => !!this.form[key])
    },
    totalPrice () {
      let price = 0
      this.formData.progres_jenis_pekerjaans.forEach(jenisPekerjaan => {
        if (!!jenisPekerjaan.harga_total) {
          price += parseFloat(jenisPekerjaan.harga_total)
        }
      })
      return price
    }
  },

  created () {
    this.getLaporanProgresPO()
    this.getPOSuppliers()
  },

  methods: {
    ...mapActions(laporanProgresPOStore, ['editLaporanProgresPO', 'fetchLaporanProgresPO']),
    ...mapActions(POSupplierStore, ['fetchPOSuppliers']),

    async getLaporanProgresPO () {
      try {
        const { data } = await this.fetchLaporanProgresPO(this.id)
        this.formData = JSON.parse(JSON.stringify(data))
        this.formData.progres_jenis_pekerjaans.forEach((jenisPekerjaan, jenisPekerjaanIndex) => {
          jenisPekerjaan.id_table = (jenisPekerjaanIndex + 1).toString(),
          jenisPekerjaan.error = false
          jenisPekerjaan.actions = false
        })
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    async getPOSuppliers () {
      try {
        const { data } = await this.fetchPOSuppliers({ skip_pagination: true })
        this.POSuppliers = JSON.parse(JSON.stringify(data))
        this.isDataFetched = true
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToManajemenLaporanProgresPO () {
      this.redirectTo('ManajemenLaporanProgresPO')
    },

    resetFormJenisPekerjaan () {
      this.form = {
        nama: '',
        harga_total: '',
        harga_hari_lalu: '',
        persentase_hari_lalu: '',
        harga_hari_ini: '',
        persentase_hari_ini: '',
        harga_progres_total: '',
        persentase_progres_total: ''
      }
    },

    addJenisPekerjaan () {
      if (!this.formData.progres_jenis_pekerjaans.some(jenisPekerjaan => jenisPekerjaan.nama === this.form.nama)) {
        const jenisPekerjaanRow = {
          id_table: this.formData.progres_jenis_pekerjaans.length + 1,
          nama: this.form.nama,
          actions: true,
          harga_total: parseFloat(this.form.harga_total.replace(',', '.')) || 0,
          harga_hari_lalu: parseFloat(this.form.harga_hari_lalu.replace(',', '.')) || 0,
          persentase_hari_lalu: parseFloat(this.form.persentase_hari_lalu) || 0,
          harga_hari_ini: parseFloat(this.form.harga_hari_ini.replace(',', '.')) || 0,
          persentase_hari_ini: parseFloat(this.form.persentase_hari_ini) || 0,
          harga_progres_total: parseFloat(this.form.harga_progres_total.replace(',', '.')) || 0,
          persentase_progres_total: parseFloat(this.form.persentase_progres_total) || 0
        }
        this.formData.progres_jenis_pekerjaans.push(jenisPekerjaanRow)
        this.showToast('Jenis pekerjaan berhasil ditambahkan!')
        this.toggleDrawer()
        this.resetFormJenisPekerjaan()
      } else {
        this.showToast('Jenis pekerjaan sudah ada', 'error')
      }
    },

    updateJenisPekerjaan () {
      if (!this.formData.progres_jenis_pekerjaans.some(jenisPekerjaan => jenisPekerjaan.nama === this.form.jenisPekerjaan) || this.form.jenisPekerjaan === this.form.currentNama) {
        const updateIndex = this.formData.progres_jenis_pekerjaans.findIndex(jenisPekerjaan => jenisPekerjaan.nama === this.form.currentNama)
        this.formData.progres_jenis_pekerjaans.splice(updateIndex, 1, {
          ...this.formData.progres_jenis_pekerjaans[updateIndex],
          nama: this.form.nama,
          actions: true,
          harga_total: parseFloat(this.form.harga_total.replace(',', '.')) || 0,
          harga_hari_lalu: parseFloat(this.form.harga_hari_lalu.replace(',', '.')) || 0,
          persentase_hari_lalu: parseFloat(this.form.persentase_hari_lalu) || 0,
          harga_hari_ini: parseFloat(this.form.harga_hari_ini.replace(',', '.')) || 0,
          persentase_hari_ini: parseFloat(this.form.persentase_hari_ini) || 0,
          harga_progres_total: parseFloat(this.form.harga_progres_total.replace(',', '.')) || 0,
          persentase_progres_total: parseFloat(this.form.persentase_progres_total) || 0
        })
        this.showToast('Jenis pekerjaan berhasil diubah!')
        this.toggleDrawer()
        this.resetFormJenisPekerjaan()
      } else {
        this.showToast('Jenis pekerjaan sudah ada', 'error')
      }
    },

    moveJenisPekerjaan (index, direction) {
      if (direction === 'UP') {
        let temp = JSON.parse(JSON.stringify(this.formData.progres_jenis_pekerjaans[index]))
        this.formData.progres_jenis_pekerjaans[index] = JSON.parse(JSON.stringify(this.formData.progres_jenis_pekerjaans[index-1]))
        this.formData.progres_jenis_pekerjaans[index-1] = JSON.parse(JSON.stringify(temp))
        this.formData.progres_jenis_pekerjaans[index].id_table = index + 1
        this.formData.progres_jenis_pekerjaans[index - 1].id_table = index
      } else if (direction === 'DOWN') {
        let temp = JSON.parse(JSON.stringify(this.formData.progres_jenis_pekerjaans[index]))
        this.formData.progres_jenis_pekerjaans[index] = JSON.parse(JSON.stringify(this.formData.progres_jenis_pekerjaans[index+1]))
        this.formData.progres_jenis_pekerjaans[index+1] = JSON.parse(JSON.stringify(temp))
        this.formData.progres_jenis_pekerjaans[index].id_table = index + 1
        this.formData.progres_jenis_pekerjaans[index + 1].id_table = index + 2
      }

      this.formData.progres_jenis_pekerjaans.forEach((jenisPekerjaan, indexJenisPekerjaan) => {
        jenisPekerjaan.sequence = indexJenisPekerjaan + 1
      })
    },

    deleteJenisPekerjaan (index) {
      this.formData.progres_jenis_pekerjaans.splice(index, 1)
      this.showToast('JenisPekerjaan berhasil dihapus!')
    },

    async submit () {
      this.visibleLoading.submitButton = true
      try {
        await this.editLaporanProgresPO(this.id, this.generatePayload())
        this.redirectTo('ManajemenLaporanProgresPO')
        this.showToast('Laporan Progres PO baru berhasil ditambahkan!')
      } catch (e) {
        this.showErrorResponse(e)
      } finally {
        this.visibleLoading.submitButton = false
      }
    },

    generatePayload () {
      let hargaProgresHariLalu = 0
      let persentaseProgresHariLalu = 0
      let hargaProgresHariIni = 0
      let persentaseProgresHariIni = 0
      let hargaProgresTotal = 0
      let persentaseProgresTotal = 0
      const formData = JSON.parse(JSON.stringify(this.formData))
      formData.harga_total = this.totalPrice
      formData.progres_jenis_pekerjaans.forEach((jenisPekerjaan, index) => {
        jenisPekerjaan.sequence = index + 1
        if (!!jenisPekerjaan.harga_hari_lalu) {
          hargaProgresHariLalu += parseFloat(jenisPekerjaan.harga_hari_lalu)
        }
        if (!!jenisPekerjaan.persentase_hari_lalu) {
          persentaseProgresHariLalu += parseFloat(jenisPekerjaan.persentase_hari_lalu)
        }
        if (!!jenisPekerjaan.harga_hari_ini) {
          hargaProgresHariIni += parseFloat(jenisPekerjaan.harga_hari_ini)
        }
        if (!!jenisPekerjaan.persentase_hari_ini) {
          persentaseProgresHariIni += parseFloat(jenisPekerjaan.persentase_hari_ini)
        }
        if (!!jenisPekerjaan.harga_progres_total) {
          hargaProgresTotal += parseFloat(jenisPekerjaan.harga_progres_total)
        }
        if (!!jenisPekerjaan.persentase_progres_total) {
          persentaseProgresTotal += parseFloat(jenisPekerjaan.persentase_progres_total)
        }
      })
      formData.harga_progres_hari_lalu = hargaProgresHariLalu
      formData.persentase_progres_hari_lalu = persentaseProgresHariLalu
      formData.harga_progres_hari_ini = hargaProgresHariIni
      formData.persentase_progres_hari_ini = persentaseProgresHariIni
      formData.persentase_progres_total = persentaseProgresTotal
      formData.persentase_progres_total = persentaseProgresTotal
      return formData
    },

    toggleDrawer (selectedJenisPekerjaan = null) {
      this.resetFormJenisPekerjaan()
      if (selectedJenisPekerjaan) {
        this.isEditMode = true
        this.form = {
          currentNama: selectedJenisPekerjaan.nama,
          nama: selectedJenisPekerjaan.nama,
          harga_total: selectedJenisPekerjaan.harga_total.toString(),
          harga_hari_lalu: selectedJenisPekerjaan.harga_hari_lalu.toString(),
          persentase_hari_lalu: selectedJenisPekerjaan.persentase_hari_lalu.toString(),
          harga_hari_ini: selectedJenisPekerjaan.harga_hari_ini.toString(),
          persentase_hari_ini: selectedJenisPekerjaan.persentase_hari_ini.toString(),
          harga_progres_total: selectedJenisPekerjaan.harga_progres_total.toString(),
          persentase_progres_total: selectedJenisPekerjaan.persentase_progres_total.toString()
        }
      } else {
        this.isEditMode = false
      }
      this.visibleDrawer = !this.visibleDrawer
    }
  },

  goToManajemenLaporanProgresPO () {
    this.$router.back()
  }
}
