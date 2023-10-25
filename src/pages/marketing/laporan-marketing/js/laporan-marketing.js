import { mapActions } from 'pinia'
import { laporanMarketingStore } from '~/store/marketing/laporan-marketing'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'
import AclHandler from '~/mixins/acl-handler'
import DebounceHandler from '~/mixins/debounce-handler'
import helpers from '~/utils/helpers'

import { STATUS_MARKETING } from '~/data/marketing'
import { STATUS_VERIFIKASI } from '~/data/konsumen'

import arrowCounterClockwiseIcon from '/arrow-counter-clockwise.svg'

import {
  ArrowDown,
  ArrowUp,
  Plus,
  Search,
  Edit,
  Delete
} from '@element-plus/icons-vue'

export default {
  name: 'laporan-marketing',

  mixins: [RouterHandler, ToastHandler, AclHandler, DebounceHandler],

  components: {
    PageHeader,
    ArrowDown,
    ArrowUp,
    Plus,
    Search
  },

  data () {
    return {
      filters: {
        search: this.$route.query.search || null,
        status_fee: this.$route.query.status_fee || null
      },
      pagination: {
        page: 1,
        size: 10
      },
      statuses: STATUS_MARKETING,
      verificationStatuses: STATUS_VERIFIKASI,
      laporanMarketings: [],
      totalLaporanMarketings: 0,
      visibleFilter: false,
      visibleLoadingTable: false,
      icons: {
        delete: Delete,
        edit: Edit,
        arrowCounterClockwise: arrowCounterClockwiseIcon
      },
      helpers
    }
  },

  computed: {
    totalShownLaporanMarketings () {
      const totalItems = this.totalLaporanMarketings
      const { page, size } = this.pagination
      const totalSize = page * size
      const lastPageSize = totalItems % size

      return (totalItems >= totalSize) ? size : lastPageSize
    },

    generateFilters () {
      return {
        ...this.filters,
        ...this.pagination
      }
    },

    isAnyFilterApplied () {
      return Object.keys(this.filters).some(key => !!this.filters[key])
    }
  },

  created () {
    this.visibleFilter = this.isAnyFilterApplied
    this.getLaporanMarketings()
  },

  methods: {
    ...mapActions(laporanMarketingStore, [
      'fetchLaporanMarketings',
      'deleteLaporanMarketing'
    ]),

    async getLaporanMarketings () {
      this.visibleLoadingTable = true
      try {
        const { data } = await this.fetchLaporanMarketings(this.generateFilters)
        this.laporanMarketings = JSON.parse(JSON.stringify(data.data))
        this.totalLaporanMarketings = data.pagination.total_items
      } catch (error) {
        this.showErrorResponse(error)
      } finally {
        this.visibleLoadingTable = false
      }
    },

    handlePageChange (page) {
      this.pagination.page = page
      this.getLaporanMarketings()
    },

    handleFilterChange () {
      if (this.filters.status_fee === '') {
        this.filters.status_fee = null
      }

      this.setRouteParam('LaporanMarketing', { ...this.query, ...this.filters })
      this.handlePageChange(1)
    },

    toggleFilter () {
      this.visibleFilter = !this.visibleFilter
    },

    clearFilters () {
      Object.keys(this.filters).forEach(filter => {
        this.filters[filter] = null
      })
      this.handleFilterChange()
    },

    goToDetailPage ({ id }) {
      this.redirectTo('LaporanMarketingDetail', {
        params: {
          id: id
        }
      })
    },

    goToEditPage (id) {
      this.redirectTo('LaporanMarketingEdit', {
        params: {
          id: id
        }
      })
    },

    goToMarketerDetailPage (id) {
      this.redirectTo('ManajemenMarketerDetail', {
        params: {
          id: id
        }
      })
    },

    goToDokumenKonsumenDetailPage (id) {
      this.redirectTo('ManajemenDokumenKonsumenDetail', {
        params: {
          id: id
        }
      })
    },
  }
}
