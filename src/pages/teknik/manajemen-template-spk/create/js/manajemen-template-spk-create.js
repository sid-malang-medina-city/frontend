import { ElMessage, ElMessageBox } from 'element-plus'

import { mapActions } from 'pinia'
import { templateSPKStore } from '~/store/teknik/template-spk'
import { tipeUnitStore } from '~/store/unit/tipe-unit'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'
import helpers from '~/utils/helpers'

import receiptIcon from '/receipt.svg'
import briefcaseIcon from '/briefcase.svg'

import {
  CircleCheckFilled,
  WarningFilled,
  Plus,
  Delete,
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
  name: 'manajemen-template-spk-create',

  mixins: [RouterHandler, ToastHandler],

  components: {
    CircleCheckFilled,
    WarningFilled,
    Plus,
    PageHeader,
  },

  data () {
    return {
      formData: {
        nama: '',
        tipe_unit: '',
        jenis_pekerjaans: []
      },
      form: {
        jenisPekerjaan: '',
        pekerjaans: []
      },
      namaPekerjaan: '',
      satuanUkuran: '',
      volume: '',
      hargaSatuan: '',
      satuanUkurans: SATUAN_UKURANS,
      tipeUnits: [],
      icons: {
        receipt: receiptIcon,
        briefcase: briefcaseIcon,
        delete: Delete,
        edit: Edit
      },
      visibleDrawer: false,
      visibleLoading: false,
      isEditMode: false,
      helpers
    }
  },

  computed: {
    isAllRequiredFieldsFilled () {
      return !!this.formData.nama && !!this.formData.tipe_unit && this.formData.jenis_pekerjaans.length > 0
    },
    isAddPekerjaanFormIsFilled () {
      return !!this.form.jenisPekerjaan && this.form.pekerjaans.length > 0
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
    this.getTipeUnits()
  },

  methods: {
    ...mapActions(templateSPKStore, ['createTemplateSPK']),
    ...mapActions(tipeUnitStore, ['fetchTipeUnits']),

    async getTipeUnits () {
      try {
        const { data } = await this.fetchTipeUnits({
          skip_pagination: true
        })
        this.tipeUnits = JSON.parse(JSON.stringify(data))
      } catch (error) {
        this.showErrorResponse(error)
      } finally {
        this.visibleLoadingTable = false
      }
    },

    goToManajemenTemplateSPK () {
      this.redirectTo('ManajemenTemplateSPK')
    },

    addPekerjaan () {
      if (!this.form.pekerjaans.some(pekerjaan => pekerjaan.nama === this.namaPekerjaan)) {
        this.form.pekerjaans.push({
          id: (this.formData.jenis_pekerjaans.length + 1).toString() + (this.form.pekerjaans.length + 1).toString(),
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
      // const rowDefaultValues = {
      //   nama: '',
      //   satuan_ukuran: '',
      //   volume: '',
      //   harga_satuan: '',
      //   harga_total: ''
      // }
      if (!this.formData.jenis_pekerjaans.some(jenisPekerjaan => jenisPekerjaan.nama === this.form.jenisPekerjaan)) {
        const jenisPekerjaanRow = {
          id: this.formData.jenis_pekerjaans.length + 1,
          nama: this.form.jenisPekerjaan,
          // ...rowDefaultValues,
          actions: true,
          children: this.form.pekerjaans
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
      if (!this.formData.jenis_pekerjaans.some(jenisPekerjaan => jenisPekerjaan.nama === this.form.jenisPekerjaan)) {
        const updateIndex = this.formData.jenis_pekerjaans.findIndex(jenisPekerjaan => jenisPekerjaan.nama === this.form.currentJenisPekerjaan)
        this.formData.jenis_pekerjaans.splice(updateIndex, 1, {
          ...this.formData.jenis_pekerjaans[updateIndex],
          nama: this.form.jenisPekerjaan,
          children: this.form.pekerjaans
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
      this.formData.jenis_pekerjaans.forEach(jenisPekerjaan => {
        jenisPekerjaan.children.forEach(pekerjaan => {
          pekerjaan.persentase_pekerjaan = (pekerjaan.harga_total/this.totalPrice).toFixed(2)
        })
      })
    },

    deleteJenisPekerjaan (jenisPekerjaan) {
      this.formData.jenis_pekerjaans.splice(this.formData.jenis_pekerjaans.findIndex(jenisPekerjaan => jenisPekerjaan.nama === jenisPekerjaan), 1)
      this.calculatePersentasePekerjaan()
      this.showToast('Pekerjaan berhasil dihapus!')
    },

    async submit () {
      this.visibleLoading = true
      try {
        await this.createTemplateSPK(this.formData)
        this.redirectTo('ManajemenTemplateSPK')
        this.showToast('Template SPK baru berhasil ditambahkan!')
      } catch (e) {
        this.showErrorResponse(e)
      } finally {
        this.visibleLoading = false
      }
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
    }
  }
}
