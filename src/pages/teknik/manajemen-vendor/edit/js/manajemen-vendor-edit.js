import { mapActions } from 'pinia'
import { vendorStore } from '~/store/teknik/vendor'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'

import {
  CircleCheckFilled,
  WarningFilled
} from '@element-plus/icons-vue'

const PHONE_NUMBER_REGEX = /^\d+$/

export default {
  name: 'manajemen-vendor-edit',

  mixins: [RouterHandler, ToastHandler],

  components: {
    CircleCheckFilled,
    WarningFilled,
    PageHeader
  },

  data () {
    return {
      formData: {
        nama: '',
        jabatan: '',
        alamat: '',
        nomor_ktp: '',
        rekening_bank: '',
        nomor_rekening: '',
        nama_rekening: '',
        nama_perusahaan: ''
      },
      error: {
        nama: '',
        jabatan: '',
        alamat: ''
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
    this.getVendor()
  },

  methods: {
    ...mapActions(vendorStore, [
      'editVendor',
      'fetchVendor'
    ]),

    async getVendor () {
      try {
        const { data } = await this.fetchVendor(this.id)
        this.formData = JSON.parse(JSON.stringify(data))
      } catch (e) {
        this.showErrorResponse(e)
      }
    },

    goToManajemenVendor () {
      this.$router.back()
    },

    async submit () {
      this.visibleLoading = true
      try {
        await this.editVendor(this.id, this.formData)
        this.redirectTo('ManajemenVendor')
        this.showToast('Vendor berhasil diubah!')
      } catch (e) {
        this.showErrorResponse(e)
      } finally {
        this.visibleLoading = false
      }
    }
  }
}
