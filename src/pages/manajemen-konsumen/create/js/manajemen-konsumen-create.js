import { mapActions } from 'pinia'
import { konsumenStore } from '~/store/konsumen'
import { marketerStore } from '~/store/marketing/marketer'
import { unitStore } from '~/store/unit'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_NUMBER_REGEX = /^\d+$/

import {
  CircleCheckFilled,
  WarningFilled
} from '@element-plus/icons-vue'

export default {
  name: 'manajemen-konsumen-create',

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
        email: '',
        no_telp: '',
        alamat: '',
        marketer_id: '',
        unit_id: '',
      },
      error: {
        email: '',
        no_telp: ''
      },
      marketers: [],
      units: []
    }
  },

  computed: {
    isAllRequiredFieldsFilled () {
      const requiredFields = Object.keys(this.formData)
      return requiredFields.every(field => !!this.formData[field])
    }
  },

  created () {
    this.getMarketers()
    this.getUnits()
  },

  methods: {
    ...mapActions(konsumenStore, ['createKonsumen']),
    ...mapActions(marketerStore, ['fetchMarketers']),
    ...mapActions(unitStore, ['fetchUnits']),

    async getMarketers () {
      try {
        const { data } = await this.fetchMarketers({ page: 1, page_size: 99999 })
        this.marketers = JSON.parse(JSON.stringify(data.data))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    async getUnits () {
      try {
        const { data } = await this.fetchUnits({ page: 1, page_size: 9999 })
        this.units = JSON.parse(JSON.stringify(data.data))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToManajemenKonsumen () {
      this.redirectTo('ManajemenKonsumen')
    },

    validateEmail () {
      if (!EMAIL_REGEX.test(String(this.formData.email).toLowerCase())) {
        this.error.email = 'Gunakan format yang sesuai (contoh: konsumen@gmail.com)'
        return false
      }

      this.error.email = ''
      return true
    },

    validatePhoneNumber () {
      if (!PHONE_NUMBER_REGEX.test(this.formData.no_telp)) {
        this.error.no_telp = 'Gunakan format yang sesuai (contoh: 08219382819)'
        return false
      }

      this.error.no_telp = ''
      return true
    },

    async submit () {
      if (this.validateEmail() && this.validatePhoneNumber()) {
        this.visibleLoading = true
        try {
          await this.createKonsumen(this.formData)
          this.redirectTo('ManajemenKonsumen')
          this.showToast('Konsumen baru berhasil ditambahkan!')
        } catch (e) {
          this.showErrorResponse(e)
        } finally {
          this.visibleLoading = false
        }
      }
    }
  }
}