import { mapActions } from 'pinia'
import { laporanMarketingStore } from '~/store/marketing/laporan-marketing'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'
import AclHandler from '~/mixins/acl-handler'
import helpers from '~/utils/helpers'

import { STATUS_MARKETING } from '~/data/marketing'

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

  mixins: [RouterHandler, ToastHandler, AclHandler],

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
      laporanMarketings: [],
      totalLaporanMarketings: 0,
      visibleFilter: false,
      visibleLoadingTable: false,
      icons: {
        delete: Delete,
        edit: Edit
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
    }
  },

  created () {
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
        console.log('data', data)
        this.laporanMarketings = JSON.parse(JSON.stringify(data.data))
        this.totalLaporanMarketings = data.pagination.total_items
      } catch (error) {
        console.log(error)
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
      this.setRouteParam('LaporanMarketing', { ...this.query, ...this.filters })
      this.handlePageChange(1)
    },

    toggleFilter () {
      this.visibleFilter = !this.visibleFilter
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
    }
  }
}
