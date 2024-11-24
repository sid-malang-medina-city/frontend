import { mapActions } from 'pinia'
import { laporanInvoiceStore } from '~/store/marketing/laporan-invoice'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'
import DebounceHandler from '~/mixins/debounce-handler'

import helpers from '~/utils/helpers'

import logo from '/logo.svg'
import {
  ArrowDown,
  ArrowUp,
  Plus,
  Search,
  Edit,
  Delete,
  MoreFilled,
  Stamp
} from '@element-plus/icons-vue'

export default {
  name: 'laporan-invoice',

  mixins: [RouterHandler, ToastHandler, DebounceHandler],

  components: {
    PageHeader,
    ArrowDown,
    ArrowUp,
    Plus,
    Search,
    MoreFilled,
    Stamp
  },

  data () {
    return {
      filters: {
        search: this.$route.query.search || null,
      },
      pagination: {
        page: parseInt(this.$route.query.page) || 1,
        size: 10
      },
      laporanInvoices: [],
      exportedLaporanInvoice: {},
      totalLaporanInvoices: 0,
      visibleFilter: false,
      visibleLoadingTable: false,
      icons: {
        delete: Delete,
        edit: Edit
      },
      helpers,
      logo
    }
  },

  computed: {
    totalShownLaporanInvoices () {
      const totalItems = this.totalLaporanInvoices
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
    this.visibleFilter = !!this.filters.search
    this.getLaporanInvoices()
  },

  methods: {
    ...mapActions(laporanInvoiceStore, [
      'fetchLaporanInvoices',
      'generatePDF'
    ]),

    async getLaporanInvoices () {
      this.visibleLoadingTable = true
      try {
        const { data } = await this.fetchLaporanInvoices(this.generateFilters)
        this.laporanInvoices = JSON.parse(JSON.stringify(data.data))
        this.totalLaporanInvoices = data.pagination.total_items
      } catch (error) {
        this.showErrorResponse(error)
      } finally {
        this.visibleLoadingTable = false
      }
    },

    handlePageChange (page) {
      this.pagination.page = page
      this.setRouteParam('KeuanganLaporanMarketingInvoice', { ...this.query, ...this.filters, ...this.pagination })
      this.getLaporanInvoices()
    },

    handleFilterChange () {
      this.handlePageChange(1)
    },

    toggleFilter () {
      this.visibleFilter = !this.visibleFilter
    },

    goToLaporanMarketingDetailPage (id) {
      this.redirectTo('KeuanganLaporanMarketingDetail', {
        params: {
          id: id
        }
      })
    },

    async generateLaporanInvoicePDF (id) {
      try {
        const { data } = await this.generatePDF({ id })
        const accessUrl = JSON.parse(JSON.stringify(data.access_url))
        window.open(accessUrl, '_blank');
        this.getLaporanInvoices()
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    openDocumentInNewTab (accessUrl) {
      window.open(accessUrl, '_blank');
    }
  }
}
