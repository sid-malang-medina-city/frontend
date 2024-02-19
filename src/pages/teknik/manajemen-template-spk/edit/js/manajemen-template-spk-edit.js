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
  name: 'manajemen-template-spk-edit',

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
      volume: null,
      hargaSatuan: '',
      editedNamaPekerjaan: '',
      satuanUkurans: SATUAN_UKURANS,
      tipeUnits: [],
      icons: {
        receipt: receiptIcon,
        briefcase: briefcaseIcon,
        delete: Delete,
        edit: Edit,
        arrowUp: ArrowUp,
        arrowDown: ArrowDown
      },
      visibleDrawer: false,
      visibleLoading: false,
      isDataFetched: false,
      isEditMode: false,
      isEditPekerjaanMode: false,
      helpers
    }
  },

  computed: {
    id () {
      return this.$route.params.id
    },
    isAllRequiredFieldsFilled () {
      return !!this.formData.nama && !!this.formData.tipe_unit && this.formData.jenis_pekerjaans.length > 0
    },
    isAddPekerjaanFormIsFilled () {
      return !!this.namaPekerjaan && !!this.satuanUkuran && !!this.volume && !!this.hargaSatuan
    },
    isAddJenisPekerjaanFormIsFilled () {
      return !!this.form.jenisPekerjaan && this.form.pekerjaans.length > 0
    },
    totalPrice () {
      let price = 0
      this.formData.jenis_pekerjaans.forEach(jenisPekerjaan => {
        price += jenisPekerjaan.children.reduce((harga, pekerjaan) => {
          return harga + parseFloat(parseFloat(pekerjaan.harga_total).toFixed(2))
        }, 0)
      })
      return price
    }
  },

  created () {
    this.getTemplateSPK()
    this.getTipeUnits()
  },

  methods: {
    ...mapActions(templateSPKStore, ['editTemplateSPK','fetchTemplateSPK']),
    ...mapActions(tipeUnitStore, ['fetchTipeUnits']),

    async getTemplateSPK () {
      this.isDataFetched = true
      try {
        const { data } = await this.fetchTemplateSPK(this.id)
        this.initFormData(JSON.parse(JSON.stringify(data)))
      } catch (e) {
        this.showErrorResponse(e)
      } finally {
        this.isDataFetched = false
      }
    },

    async getTipeUnits () {
      try {
        const { data } = await this.fetchTipeUnits({
          skip_pagination: true
        })
        this.tipeUnits = JSON.parse(JSON.stringify(data))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    initFormData (data) {
      this.formData = data
      delete this.formData.id
      this.formData.jenis_pekerjaans.forEach((jenisPekerjaan, jenisPekerjaanIndex) => {
        jenisPekerjaan.id_table = (jenisPekerjaanIndex + 1).toString()
        jenisPekerjaan.actions = true
        jenisPekerjaan.pekerjaans.forEach((pekerjaan, pekerjaanIndex) => {
          pekerjaan.id_table = (jenisPekerjaanIndex + 1).toString() + (jenisPekerjaanIndex + 1).toString() + (pekerjaanIndex + 1).toString()
          pekerjaan.harga_total = parseFloat((parseFloat(pekerjaan.volume) * parseFloat(pekerjaan.harga_satuan)).toFixed(2))
        })
        jenisPekerjaan.harga_total = this.calculateHargaTotalJenisPekerjaan(jenisPekerjaan.pekerjaans)
        jenisPekerjaan.children = [...jenisPekerjaan.pekerjaans]
      })
    },

    calculateHargaTotalJenisPekerjaan (pekerjaans) {
      return pekerjaans.reduce((harga, pekerjaan) => {
        return harga + parseFloat(parseFloat(pekerjaan.harga_total).toFixed(2))
      }, 0)
    },

    calculatePersentaseJenisPekerjaan () {
      this.formData.jenis_pekerjaans.forEach(jenisPekerjaan => {
        jenisPekerjaan.persentase_pekerjaan = jenisPekerjaan.pekerjaans.reduce((persentase, pekerjaan) => {
          return persentase + pekerjaan.persentase_pekerjaan
        }, 0)
      })
    },

    goToManajemenTemplateSPK () {
      this.redirectTo('ManajemenTemplateSPK')
    },

    addPekerjaan () {
      if (!this.form.pekerjaans.some(pekerjaan => pekerjaan.nama === this.namaPekerjaan)) {
        this.form.pekerjaans.push({
          id_table: (this.formData.jenis_pekerjaans.length + 1).toString() + (this.form.pekerjaans.length + 1).toString(),
          nama: this.namaPekerjaan,
          satuan_ukuran: this.satuanUkuran,
          volume: parseFloat(parseFloat(this.volume).toFixed(2)),
          harga_satuan: parseFloat(parseFloat(this.hargaSatuan.replace(',','.')).toFixed(2)),
          harga_total: parseFloat((parseFloat(this.volume) * parseFloat(this.hargaSatuan.replace(',','.'))).toFixed(2))
        })
        this.showToast('Pekerjaan berhasil ditambahkan!')
        this.clearPekerjaan()
      } else {
        this.showToast('Nama pekerjaan sudah ada', 'error')
      }
    },

    editPekerjaan () {
      this.form.pekerjaans.forEach(pekerjaan => {
        if (pekerjaan.nama === this.editedNamaPekerjaan) {
          if ((pekerjaan.nama !== this.namaPekerjaan && !this.form.pekerjaans.some(checkPekerjaan => checkPekerjaan.nama === this.namaPekerjaan)) || pekerjaan.nama === this.namaPekerjaan) {
            pekerjaan.nama = this.namaPekerjaan,
            pekerjaan.satuan_ukuran = this.satuanUkuran,
            pekerjaan.volume = parseFloat(parseFloat(this.volume).toFixed(2)),
            pekerjaan.harga_satuan = parseFloat(parseFloat(this.hargaSatuan.replace(',', '.')).toFixed(2)),
            pekerjaan.harga_total = parseFloat((parseFloat(this.volume) * parseFloat(this.hargaSatuan.replace(',','.'))).toFixed(2))
            this.showToast('Pekerjaan berhasil diubah')
            this.clearPekerjaan()
            this.isEditPekerjaanMode = false
            return
          } else {
            this.showToast('Nama pekerjaan sudah ada', 'error')
          }
        }
      })
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

    movePekerjaan (index, direction) {
      if (direction === 'UP') {
        let temp = JSON.parse(JSON.stringify(this.form.pekerjaans[index]))
        this.form.pekerjaans[index] = JSON.parse(JSON.stringify(this.form.pekerjaans[index-1]))
        this.form.pekerjaans[index-1] = JSON.parse(JSON.stringify(temp))
      } else if (direction === 'DOWN') {
        let temp = JSON.parse(JSON.stringify(this.form.pekerjaans[index]))
        this.form.pekerjaans[index] = JSON.parse(JSON.stringify(this.form.pekerjaans[index+1]))
        this.form.pekerjaans[index+1] = JSON.parse(JSON.stringify(temp))
      }
    },

    deleteAllPekerjaan () {
      this.form.pekerjaans = []
      this.showToast('Semua pekerjaan berhasil dihapus!')
    },

    deletePekerjaan (namaPekerjaan) {
      this.form.pekerjaans.splice(this.form.pekerjaans.findIndex(pekerjaan => pekerjaan.nama === namaPekerjaan), 1)
      this.isEditPekerjaanMode = false
      this.clearPekerjaan()
      this.showToast('Pekerjaan berhasil dihapus!')
    },

    toggleEditPekerjaan (pekerjaan) {
      this.isEditPekerjaanMode = true
      this.editedNamaPekerjaan = pekerjaan.nama.toString()
      this.namaPekerjaan = pekerjaan.nama.toString()
      this.satuanUkuran = pekerjaan.satuan_ukuran.toString()
      this.volume = pekerjaan.volume.toString()
      this.hargaSatuan = pekerjaan.harga_satuan.toString()
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
        this.showToast('Jenis pekerjaan berhasil ditambahkan!')
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
        this.showToast('Jenis pekerjaan berhasil diubah!')
        this.toggleDrawer()
        this.resetFormPekerjaan()
      } else {
        this.showToast('Jenis pekerjaan sudah ada', 'error')
      }
    },

    calculatePersentasePekerjaan () {
      this.formData.harga_total = 0
      this.formData.jenis_pekerjaans.forEach((jenisPekerjaan, indexJenisPekerjaan) => {
        jenisPekerjaan.sequence = indexJenisPekerjaan + 1
        jenisPekerjaan.children.forEach((pekerjaan, indexPekerjaan) => {
          pekerjaan.sequence = indexPekerjaan + 1
          pekerjaan.persentase_pekerjaan = (pekerjaan.harga_total/this.totalPrice)*100
          this.formData.harga_total += pekerjaan.harga_total
        })
      })
    },

    moveJenisPekerjaan (index, direction) {
      if (direction === 'UP') {
        let temp = JSON.parse(JSON.stringify(this.formData.jenis_pekerjaans[index]))
        this.formData.jenis_pekerjaans[index] = JSON.parse(JSON.stringify(this.formData.jenis_pekerjaans[index-1]))
        this.formData.jenis_pekerjaans[index-1] = JSON.parse(JSON.stringify(temp))
        this.formData.jenis_pekerjaans[index].id_table = index + 1
        this.formData.jenis_pekerjaans[index - 1].id_table = index
      } else if (direction === 'DOWN') {
        let temp = JSON.parse(JSON.stringify(this.formData.jenis_pekerjaans[index]))
        this.formData.jenis_pekerjaans[index] = JSON.parse(JSON.stringify(this.formData.jenis_pekerjaans[index+1]))
        this.formData.jenis_pekerjaans[index+1] = JSON.parse(JSON.stringify(temp))
        this.formData.jenis_pekerjaans[index].id_table = index + 1
        this.formData.jenis_pekerjaans[index + 1].id_table = index + 2
      }
    },

    deleteJenisPekerjaan (selectedJenisPekerjaan) {
      this.formData.jenis_pekerjaans.splice(this.formData.jenis_pekerjaans.findIndex(jenisPekerjaan => jenisPekerjaan.nama === selectedJenisPekerjaan), 1)
      this.calculatePersentasePekerjaan()
      this.calculatePersentaseJenisPekerjaan()
      this.showToast('Jenis pekerjaan berhasil dihapus!')
    },

    async submit () {
      this.visibleLoading = true
      this.calculatePersentasePekerjaan()
      try {
        await this.editTemplateSPK(this.id, this.generatePayload())
        this.redirectTo('ManajemenTemplateSPK')
        this.showToast('Template SPK berhasil diubah!')
      } catch (e) {
        this.showErrorResponse(e)
      } finally {
        this.visibleLoading = false
      }
    },

    generatePayload () {
      const formData = JSON.parse(JSON.stringify(this.formData))
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
    }
  }
}
