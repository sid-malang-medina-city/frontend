import { mapActions } from 'pinia'
import { POSupplierStore } from '~/store/teknik/po-supplier'
import { supplierStore } from '~/store/teknik/supplier'

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
  name: 'manajemen-po-supplier-edit',

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
        supplier: null,
        tanggal: '',
        catatan: '',
        harga_total: null,
        harga_total_ppn: null,
        biaya_kirim: null,
        biaya_lainnya: null,
        harga_final: null,
        barangs: []
      },
      form: {
        nama: '',
        keterangan: '',
        spesifikasi: '',
        volume: null,
        satuan: '',
        harga: null,
        harga_total: null
      },
      satuanUkurans: SATUAN_UKURANS,
      suppliers: [],
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
      isDataFetched: false,
      helpers
    }
  },

  computed: {
    id () {
      return this.$route.params.id
    },
    isAllRequiredFieldsFilled () {
      const requiredFields = {
        supplier: null,
        tanggal: '',
        harga_total_ppn: null
      }
      return Object.keys(requiredFields).every(key => !!this.formData[key]) && this.formData.barangs.length > 0
    },
    isAddBarangFormIsFilled () {
      const requiredFields = {
        nama: '',
        volume: null,
        satuan: '',
        harga: null,
        harga_total: null
      }
      return Object.keys(requiredFields).every(key => !!this.form[key])
    },
    subTotalPrice () {
      let price = 0
      this.formData.barangs.forEach(barang => {
        price += parseFloat(barang.harga_total)
      })
      return price
    },
    totalPrice () {
      return this.subTotalPrice + parseFloat(this.formData.harga_total_ppn || 0) + parseFloat(this.formData.biaya_kirim || 0) + parseFloat(this.formData.biaya_lainnya || 0)
    }
  },

  created () {
    this.getPOSupplier()
    this.getSuppliers()
  },

  methods: {
    ...mapActions(POSupplierStore, ['editPOSupplier', 'fetchPOSupplier']),
    ...mapActions(supplierStore, ['fetchSuppliers']),

    async getPOSupplier () {
      this.isDataFetched = false
      try {
        const { data } = await this.fetchPOSupplier(this.id)
        this.initFormData(JSON.parse(JSON.stringify(data)))
      } catch (error) {
        this.showErrorResponse(error)
      } finally {
        this.isDataFetched = true
      }
    },

    initFormData (data) {
      this.formData = data
      this.formData.barangs.forEach((barang, index) => {
        barang.id_table = (index + 1).toString()
      })
    },

    async getSuppliers () {
      this.visibleLoading.supplierDropdown = true
      try {
        const { data } = await this.fetchSuppliers({
          skip_pagination: true
        })
        this.suppliers = JSON.parse(JSON.stringify(data))
      } catch (error) {
        this.showErrorResponse(error)
      } finally {
        this.visibleLoading.supplierDropdown = false
      }
    },

    goToManajemenPOSupplier () {
      this.redirectTo('ManajemenPOSupplier')
    },

    resetFormBarang () {
      this.form = {
        nama: '',
        keterangan: '',
        spesifikasi: '',
        volume: null,
        satuan: '',
        harga: null,
        harga_total: null
      }
    },

    addBarang () {
      if (!this.formData.barangs.some(barang => barang.nama === this.form.nama)) {
        const barangRow = {
          id_table: this.formData.barangs.length + 1,
          nama: this.form.nama,
          actions: true,
          keterangan: this.form.keterangan,
          spesifikasi: this.form.spesifikasi,
          volume: this.form.volume,
          satuan: this.form.satuan,
          harga: this.form.harga,
          harga_total: this.form.harga_total
        }
        this.formData.barangs.push(barangRow)
        this.showToast('Barang berhasil ditambahkan!')
        this.toggleDrawer()
        this.resetFormBarang()
      } else {
        this.showToast('Barang sudah ada', 'error')
      }
    },

    updateBarang () {
      if (!this.formData.barangs.some(barang => barang.nama === this.form.barang) || this.form.barang === this.form.currentNama) {
        const updateIndex = this.formData.barangs.findIndex(barang => barang.nama === this.form.currentNama)
        this.formData.barangs.splice(updateIndex, 1, {
          ...this.formData.barangs[updateIndex],
          nama: this.form.nama,
          actions: true,
          keterangan: this.form.keterangan,
          spesifikasi: this.form.spesifikasi,
          volume: this.form.volume,
          satuan: this.form.satuan,
          harga: this.form.harga,
          harga_total: this.form.harga_total
        })
        this.showToast('Barang berhasil diubah!')
        this.toggleDrawer()
        this.resetFormBarang()
      } else {
        this.showToast('Barang sudah ada', 'error')
      }
    },

    moveBarang (index, direction) {
      if (direction === 'UP') {
        let temp = JSON.parse(JSON.stringify(this.formData.barangs[index]))
        this.formData.barangs[index] = JSON.parse(JSON.stringify(this.formData.barangs[index-1]))
        this.formData.barangs[index-1] = JSON.parse(JSON.stringify(temp))
        this.formData.barangs[index].id_table = index + 1
        this.formData.barangs[index - 1].id_table = index
      } else if (direction === 'DOWN') {
        let temp = JSON.parse(JSON.stringify(this.formData.barangs[index]))
        this.formData.barangs[index] = JSON.parse(JSON.stringify(this.formData.barangs[index+1]))
        this.formData.barangs[index+1] = JSON.parse(JSON.stringify(temp))
        this.formData.barangs[index].id_table = index + 1
        this.formData.barangs[index + 1].id_table = index + 2
      }

      this.formData.barangs.forEach((barang, indexBarang) => {
        barang.sequence = indexBarang + 1
      })
    },

    deleteBarang (index) {
      this.formData.barangs.splice(index, 1)
      this.showToast('Barang berhasil dihapus!')
    },

    async submit () {
      this.visibleLoading.submitButton = true
      try {
        await this.editPOSupplier(this.id, this.generatePayload())
        this.redirectTo('ManajemenPOSupplier')
        this.showToast('PO Supplier baru berhasil diubah!')
      } catch (e) {
        this.showErrorResponse(e)
      } finally {
        this.visibleLoading.submitButton = false
      }
    },

    generatePayload () {
      const formData = JSON.parse(JSON.stringify(this.formData))
      formData.harga_total = this.subTotalPrice
      formData.harga_final = this.totalPrice
      formData.barangs.forEach((barang, index) => {
        barang.sequence = index + 1
      })
      return formData
    },

    toggleDrawer (selectedBarang = null) {
      this.resetFormBarang()
      if (selectedBarang) {
        this.isEditMode = true
        this.form = {
          currentNama: selectedBarang.nama,
          nama: selectedBarang.nama,
          keterangan: selectedBarang.keterangan,
          spesifikasi: selectedBarang.spesifikasi,
          volume: selectedBarang.volume,
          satuan: selectedBarang.satuan,
          harga: selectedBarang.harga,
          harga_total: selectedBarang.harga_total
        }
      } else {
        this.isEditMode = false
      }
      this.visibleDrawer = !this.visibleDrawer
    },

    calculateHargaTotalBarang () {
      this.form.harga_total = (parseFloat(this.form.harga.toString().replace('.', '').replace(',', '.')) || 0) * (parseFloat(this.form.volume) || 0)
    }
  }
}
