import { mapActions } from 'pinia'
import { marketerStore } from '~/store/marketing/marketer'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'

import { STATUS_MARKETER } from '~/data/marketing'

import {
  CircleCheckFilled,
  WarningFilled
} from '@element-plus/icons-vue'

const PHONE_NUMBER_REGEX = /^\d+$/

export default {
  name: 'manajemen-marketer-create',

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
        nomor_telepon: '',
        alamat: '',
        status: '',
        rekening_bank: '',
        nomor_rekening: '',
        nama_rekening: '',
        npwp: ''
      },
      error: {
        nama: '',
        nomor_telepon: '',
        alamat: '',
        status: '',
        rekening_bank: '',
        nomor_rekening: '',
        nama_rekening: '',
      },
      visibleLoading: false,
      statuses: STATUS_MARKETER
    }
  },

  computed: {
    isAllRequiredFieldsFilled () {
      const requiredFields = Object.keys(this.formData)
      return requiredFields.every(field => !!this.formData[field])
    }
  },

  methods: {
    ...mapActions(marketerStore, ['createMarketer']),

    goToManajemenMarketer () {
      this.redirectTo('ManajemenMarketer')
    },

    validatePhoneNumber () {
      if (!PHONE_NUMBER_REGEX.test(this.formData.nomor_telepon)) {
        this.error.nomor_telepon = 'Gunakan format yang sesuai (contoh: 08219382819)'
        return false
      }

      this.error.nomor_telepon = ''
      return true
    },

    async submit () {
      if (this.validatePhoneNumber()) {
        this.visibleLoading = true
        try {
          await this.createMarketer(this.formData)
          this.redirectTo('ManajemenMarketer')
          this.showToast('Marketer baru berhasil ditambahkan!')
        } catch (e) {
          this.showErrorResponse(e)
        } finally {
          this.visibleLoading = false
        }
      }
    }
  }
}
