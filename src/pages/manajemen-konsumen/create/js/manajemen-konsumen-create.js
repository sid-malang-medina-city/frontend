import { mapActions } from 'pinia'
import { konsumenStore } from '~/store/konsumen'
import { marketerStore } from '~/store/marketing/marketer'
import { unitStore } from '~/store/unit'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'

import { STATUS_KONSUMEN } from '~/data/konsumen'

import {
  CircleCheckFilled,
  WarningFilled
} from '@element-plus/icons-vue'

const PHONE_NUMBER_REGEX = /^\d+$/

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
        nomor_telepon: '',
        alamat: '',
        marketer_id: '',
        unit_id: '',
        dokumen_konsumen_tanggal_booking: '',
        status: ''
      },
      error: {
        nomor_telepon: ''
      },
      visibleLoading: false,
      marketers: [],
      units: [],
      statuses: STATUS_KONSUMEN,
      requiredFields: ['nama', 'nomor_telepon', 'alamat', 'marketer_id', 'unit_id', 'status']
    }
  },

  computed: {
    isAllRequiredFieldsFilled () {
      return this.requiredFields.every(field => !!this.formData[field])
    }
  },

  created () {
    this.initFormData()
    this.getMarketers()
    this.getUnits()
  },

  methods: {
    ...mapActions(konsumenStore, ['createKonsumen']),
    ...mapActions(marketerStore, ['fetchMarketers']),
    ...mapActions(unitStore, ['fetchUnits']),

    initFormData () {
      const currentDate = new Date()
      this.formData.status = 'BOOKING'
      this.formData.dokumen_konsumen_tanggal_booking = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`
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
      this.redirectTo('ManajemenKonsumen')
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