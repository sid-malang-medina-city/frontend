import { mapActions } from 'pinia'
import { SPKNonUnitStore } from '~/store/teknik/spk-non-unit'
import { vendorStore } from '~/store/teknik/vendor'

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
  'pcs',
  'bh',
  'ls',
  'ttk',
  'set'
]

export default {
  name: 'manajemen-spk-non-unit-create',

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
        vendor: null,
        nama: '',
        nomor: '',
        harga_total: null,
        waktu_pelaksanaan: null,
        cara_pembayaran: null,
        syarat: null,
        lampiran: null,
        pekerjaans: []
      },
      form: {
        nama: '',
        volume: null,
        satuan_ukuran: '',
        harga_satuan: null,
        harga_total: null
      },
      satuanUkurans: SATUAN_UKURANS,
      vendors: [],
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
        vendorDropdown: false
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
        vendor: null,
        nama: '',
        nomor: '',
        waktu_pelaksanaan: null,
        cara_pembayaran: null,
        syarat: null,
        lampiran: null,
      }
      return Object.keys(requiredFields).every(key => !!this.formData[key]) && this.formData.pekerjaans.length > 0
    },
    isAddPekerjaanFormIsFilled () {
      const requiredFields = {
        nama: '',
        volume: null,
        satuan_ukuran: '',
        harga_satuan: null,
        harga_total: null
      }
      return Object.keys(requiredFields).every(key => !!this.form[key])
    },
    totalPrice () {
      let price = 0
      this.formData.pekerjaans.forEach(pekerjaan => {
        price += parseFloat(pekerjaan.harga_total)
      })
      return price
    },
  },

  created () {
    this.getSPKNonUnit()
    this.getVendors()
  },

  methods: {
    ...mapActions(SPKNonUnitStore, ['editSPKNonUnit', 'fetchSPKNonUnit']),
    ...mapActions(vendorStore, ['fetchVendors']),

    async getSPKNonUnit () {
      this.isDataFetched = false
      try {
        const { data } = await this.fetchSPKNonUnit(this.id)
        this.initFormData(JSON.parse(JSON.stringify(data)))
      } catch (error) {
        this.showErrorResponse(error)
      } finally {
        this.isDataFetched = true
      }
    },

    initFormData (data) {
      this.formData = data
      this.formData.vendor = data.vendor_id
      this.formData.pekerjaans.forEach((pekerjaan, index) => {
        pekerjaan.id_table = (index + 1).toString()
      })
    },

    async getVendors () {
      this.visibleLoading.vendorDropdown = true
      try {
        const { data } = await this.fetchVendors({
          skip_pagination: true
        })
        this.vendors = JSON.parse(JSON.stringify(data))
      } catch (error) {
        this.showErrorResponse(error)
      } finally {
        this.visibleLoading.vendorDropdown = false
      }
    },

    goToManajemenSPKNonUnit () {
      this.$router.back()
    },

    resetFormPekerjaan () {
      this.form = {
        nama: '',
        volume: null,
        satuan_ukuran: '',
        harga_satuan: null,
        harga_total: null
      }
    },

    addPekerjaan () {
      if (!this.formData.pekerjaans.some(pekerjaan => pekerjaan.nama === this.form.nama)) {
        const pekerjaanRow = {
          id_table: this.formData.pekerjaans.length + 1,
          nama: this.form.nama,
          actions: true,
          volume: this.form.volume,
          satuan_ukuran: this.form.satuan_ukuran,
          harga_satuan: parseFloat(this.form.harga_satuan.replace(',', '.')),
          harga_total: this.form.harga_total
        }
        this.formData.pekerjaans.push(pekerjaanRow)
        this.showToast('Pekerjaan berhasil ditambahkan!')
        this.toggleDrawer()
        this.resetFormPekerjaan()
      } else {
        this.showToast('Pekerjaan sudah ada', 'error')
      }
    },

    updatePekerjaan () {
      if (!this.formData.pekerjaans.some(pekerjaan => pekerjaan.nama === this.form.pekerjaan) || this.form.pekerjaan === this.form.currentNama) {
        const updateIndex = this.formData.pekerjaans.findIndex(pekerjaan => pekerjaan.nama === this.form.currentNama)
        this.formData.pekerjaans.splice(updateIndex, 1, {
          ...this.formData.pekerjaans[updateIndex],
          nama: this.form.nama,
          actions: true,
          volume: this.form.volume,
          satuan_ukuran: this.form.satuan_ukuran,
          harga_satuan: parseFloat(this.form.harga_satuan.replace(',', '.')),
          harga_total: this.form.harga_total
        })
        this.showToast('Pekerjaan berhasil diubah!')
        this.toggleDrawer()
        this.resetFormPekerjaan()
      } else {
        this.showToast('Pekerjaan sudah ada', 'error')
      }
    },

    movePekerjaan (index, direction) {
      if (direction === 'UP') {
        let temp = JSON.parse(JSON.stringify(this.formData.pekerjaans[index]))
        this.formData.pekerjaans[index] = JSON.parse(JSON.stringify(this.formData.pekerjaans[index-1]))
        this.formData.pekerjaans[index-1] = JSON.parse(JSON.stringify(temp))
        this.formData.pekerjaans[index].id_table = index + 1
        this.formData.pekerjaans[index - 1].id_table = index
      } else if (direction === 'DOWN') {
        let temp = JSON.parse(JSON.stringify(this.formData.pekerjaans[index]))
        this.formData.pekerjaans[index] = JSON.parse(JSON.stringify(this.formData.pekerjaans[index+1]))
        this.formData.pekerjaans[index+1] = JSON.parse(JSON.stringify(temp))
        this.formData.pekerjaans[index].id_table = index + 1
        this.formData.pekerjaans[index + 1].id_table = index + 2
      }

      this.formData.pekerjaans.forEach((pekerjaan, indexPekerjaan) => {
        pekerjaan.sequence = indexPekerjaan + 1
      })
    },

    deletePekerjaan (index) {
      this.formData.pekerjaans.splice(index, 1)
      this.showToast('Pekerjaan berhasil dihapus!')
    },

    async submit () {
      this.visibleLoading.submitButton = true
      try {
        await this.editSPKNonUnit(this.id, this.generatePayload())
        this.redirectTo('ManajemenSPKNonUnit')
        this.showToast('SPK Non Unit berhasil diubah!')
      } catch (e) {
        this.showErrorResponse(e)
      } finally {
        this.visibleLoading.submitButton = false
      }
    },

    generatePayload () {
      const formData = JSON.parse(JSON.stringify(this.formData))
      formData.harga_total = this.totalPrice
      formData.pekerjaans.forEach((pekerjaan, index) => {
        pekerjaan.sequence = index + 1
      })
      return formData
    },

    toggleDrawer (selectedPekerjaan = null) {
      this.resetFormPekerjaan()
      if (selectedPekerjaan) {
        this.isEditMode = true
        this.form = {
          currentNama: selectedPekerjaan.nama,
          nama: selectedPekerjaan.nama,
          volume: selectedPekerjaan.volume,
          satuan_ukuran: selectedPekerjaan.satuan_ukuran,
          harga_satuan: selectedPekerjaan.harga_satuan,
          harga_total: selectedPekerjaan.harga_total
        }
      } else {
        this.isEditMode = false
      }
      this.visibleDrawer = !this.visibleDrawer
    },

    calculateHargaTotalPekerjaan () {
      this.form.harga_total = (parseFloat(this.form.harga_satuan.replace('.', '').replace(',', '.')) || 0) * (parseFloat(this.form.volume) || 0)
    }
  }
}
