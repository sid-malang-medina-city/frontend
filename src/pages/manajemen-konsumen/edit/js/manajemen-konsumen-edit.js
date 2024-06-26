import { mapActions } from 'pinia'
import { konsumenStore } from '~/store/konsumen'
import { marketerStore } from '~/store/marketing/marketer'
import { unitStore } from '~/store/unit'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'

import {
  CircleCheckFilled,
  WarningFilled
} from '@element-plus/icons-vue'
import { STATUS_KONSUMEN } from '~/data/konsumen'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_NUMBER_REGEX = /^\d+$/

export default {
  name: 'manajemen-konsumen-edit',

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
        nomor_telepon: '',
        alamat: '',
        marketer_id: '',
        unit_id: '',
        dokumen_konsumen_tanggal_booking: '',
        status: 'BOOKING'
      },
      currentData: {
        nama: '',
        email: '',
        nomor_telepon: '',
        alamat: '',
        marketer_id: '',
        unit_id: '',
        dokumen_konsumen_tanggal_booking: '',
        status: ''
      },
      error: {
        email: '',
        nomor_telepon: ''
      },
      marketers: [],
      units: [],
      statuses: STATUS_KONSUMEN,
      requiredFields: ['nama', 'nomor_telepon', 'alamat', 'marketer_id', 'unit_id', 'status'],
      visibleLoading: false
    }
  },

  computed: {
    isAllRequiredFieldsFilled () {
      return this.requiredFields.every(field => !!this.formData[field])
    },
    
    id () {
      return this.$route.params.id
    }
  },

  created () {
    this.getKonsumen()
    this.getMarketers()
    this.getUnits()
  },

  methods: {
    ...mapActions(konsumenStore, ['editKonsumen', 'fetchKonsumen']),
    ...mapActions(marketerStore, ['fetchMarketers']),
    ...mapActions(unitStore, ['fetchUnits']),

    async getKonsumen () {
      try {
        const { data } = await this.fetchKonsumen(this.id)
        this.initFormData(JSON.parse(JSON.stringify(data)))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    initFormData (data) {
      this.formData = data
      this.formData.marketer_id = data.dokumen_konsumen_marketer_id
      this.formData.dokumen_konsumen_tanggal_booking = data.tanggal_booking
      this.formData.unit_id = data.dokumen_konsumen_unit_id
      this.currentData = JSON.parse(JSON.stringify(data))
    },
    
    async getMarketers () {
      try {
        const { data } = await this.fetchMarketers({ skip_pagination: "True" })
        this.marketers = JSON.parse(JSON.stringify(data))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    async getUnits () {
      try {
        const { data } = await this.fetchUnits({ skip_pagination: "True", status: 'TERSEDIA' })
        this.units = JSON.parse(JSON.stringify(data))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToManajemenKonsumen () {
      this.$router.back()
    },

    validateEmail () {
      if (!this.formData.email) {
        return true
      }

      if (!EMAIL_REGEX.test(String(this.formData.email).toLowerCase())) {
        this.error.email = 'Gunakan format yang sesuai (contoh: konsumen@gmail.com)'
        return false
      }

      this.error.email = ''
      return true
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
      if (this.validateEmail() && this.validatePhoneNumber()) {
        this.visibleLoading = true
        try {
          await this.editKonsumen(this.id, this.formData)
          this.redirectTo('ManajemenKonsumen')
          this.showToast('Konsumen berhasil diperbaharui!')
        } catch (e) {
          this.showErrorResponse(e)
        } finally {
          this.visibleLoading = false
        }
      }
    }
  }
}