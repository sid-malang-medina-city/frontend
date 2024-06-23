import { mapActions } from 'pinia'
import { laporanMarketingStore } from '~/store/marketing/laporan-marketing'

import helpers from '~/utils/helpers'

import {
  Delete,
  EditPen,
  View,
  Hide
} from '@element-plus/icons-vue'

import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'
import AclHandler from '~/mixins/acl-handler'

import { STATUS_MARKETING } from '~/data/marketing'
import { STATUS_VERIFIKASI } from '~/data/konsumen'

export default {
  name: 'laporan-marketing-detail',

  mixins: [RouterHandler, ToastHandler, AclHandler],

  components: {
    EditPen,
    View,
    Hide
  },

  data () {
    return {
      laporanMarketing: {},
      statuses: STATUS_MARKETING,
      verificationStatuses: STATUS_VERIFIKASI,
      icons: {
        delete: Delete
      },
      helpers
    }
  },

  computed: {
    id () {
      return this.$route.params.id
    }
  },

  created () {
    this.getLaporanMarketing()
  },

  methods: {
    ...mapActions(laporanMarketingStore, ['fetchLaporanMarketing']),

    async getLaporanMarketing () {
      try {
        const { data } = await this.fetchLaporanMarketing(this.id)
        this.laporanMarketing = JSON.parse(JSON.stringify(data))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToEditPage () {
      this.redirectTo('LaporanMarketingEdit', {
        params: {
          id: this.laporanMarketing.id
        }
      })
    },

    goToLaporanMarketing () {
      this.$router.back()
    },

    goToMarketerDetailPage () {
      this.redirectTo('ManajemenMarketerDetail', {
        params: {
          id: this.laporanMarketing.marketer_id
        }
      })
    },

    goToDokumenKonsumenDetailPage () {
      this.redirectTo('ManajemenDokumenKonsumenDetail', {
        params: {
          id: this.laporanMarketing.dokumen_konsumen_id
        }
      })
    }
  }
}