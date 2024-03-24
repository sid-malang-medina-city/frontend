import { mapActions } from 'pinia'
import { supplierStore } from '~/store/teknik/supplier'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'

import {
  CircleCheckFilled,
  WarningFilled
} from '@element-plus/icons-vue'

const PHONE_NUMBER_REGEX = /^\d+$/

export default {
  name: 'manajemen-supplier-edit',

  mixins: [RouterHandler, ToastHandler],

  components: {
    CircleCheckFilled,
    WarningFilled,
    PageHeader
  },

  data () {
    return {
      formData: {
        nama_perusahaan: '',
        nama_penanggung_jawab: '',
        divisi: '',
        jabatan: '',
        alamat: '',
        rekening_bank: '',
        nomor_rekening: '',
        nama_rekening: '',
        nomor_telepon: '',
        nomor_fax: ''
      },
      error: {
        nama_perusahaan: '',
        nama_penanggung_jawab: '',
        divisi: '',
        jabatan: '',
        alamat: '',
        nomor_telepon: '',
      },
      visibleLoading: false
    }
  },

  computed: {
    id () {
      return this.$route.params.id
    },

    isAllRequiredFieldsFilled () {
      const requiredFields = Object.keys(this.error)
      return requiredFields.every(field => !!this.formData[field])
    }
  },

  created () {
    this.getSupplier()
  },

  methods: {
    ...mapActions(supplierStore, [
      'editSupplier',
      'fetchSupplier'
    ]),

    async getSupplier () {
      try {
        const { data } = await this.fetchSupplier(this.id)
        this.formData = JSON.parse(JSON.stringify(data))
      } catch (e) {
        this.showErrorResponse(e)
      }
    },

    goToManajemenSupplier () {
      this.redirectTo('ManajemenSupplier')
    },

    async submit () {
      this.visibleLoading = true
      try {
        await this.editSupplier(this.id, this.formData)
        this.redirectTo('ManajemenSupplier')
        this.showToast('Supplier berhasil diubah!')
      } catch (e) {
        this.showErrorResponse(e)
      } finally {
        this.visibleLoading = false
      }
    }
  }
}
