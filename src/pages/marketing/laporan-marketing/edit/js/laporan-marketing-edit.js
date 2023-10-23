import { mapActions } from 'pinia'
import { laporanMarketingStore } from '~/store/marketing/laporan-marketing'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'

import { STATUS_MARKETING } from '~/data/marketing'

import {
  CircleCheckFilled,
  WarningFilled
} from '@element-plus/icons-vue'

export default {
  name: 'laporan-marketing-edit',

  mixins: [RouterHandler, ToastHandler],

  components: {
    CircleCheckFilled,
    WarningFilled,
    PageHeader
  },

  data () {
    return {
      formData: {
        jumlah_fee: null,
        keterangan: '',
        status_fee: ''
      },
      laporanMarketing: {},
      visibleLoading: false,
      statuses: STATUS_MARKETING
    }
  },

  computed: {
    id () {
      return this.$route.params.id
    },

    marketerName () {
      return this.laporanMarketing?.marketer?.nama
    },

    dokumenKonsumenCode () {
      return this.laporanMarketing?.dokumenKonsumen?.code
    },

    isRequiredFieldsFilled () {
      return !!this.formData.status_fee && !!this.formData.jumlah_fee
    }
  },

  created () {
    // TODO: Get Marketer and Dokumen Konsumen
    this.getLaporanMarketing()
  },

  methods: {
    ...mapActions(laporanMarketingStore, [
      'editLaporanMarketing',
      'fetchLaporanMarketing'
    ]),

    async getLaporanMarketing () {
      try {
        const { data } = await this.fetchLaporanMarketing(this.id)
        this.laporanMarketing = JSON.parse(JSON.stringify(data))
        this.formData = {
          jumlah_fee: this.laporanMarketing.jumlah_fee,
          keterangan: this.laporanMarketing.keterangan,
          status_fee: this.laporanMarketing.status_fee
        }
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToLaporanMarketing () {
      this.redirectTo('LaporanMarketing')
    },

    async submit () {
      this.visibleLoading = true
      try {
        await this.editLaporanMarketing(this.id, this.formData)
        this.redirectTo('LaporanMarketing')
        this.showToast('Laporan Marketing baru berhasil ditambahkan!')
      } catch (e) {
        this.showErrorResponse(e)
      } finally {
        this.visibleLoading = false
      }
    }
  }
}