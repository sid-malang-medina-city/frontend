import { mapActions } from 'pinia'
import { POSupplierStore } from '~/store/teknik/po-supplier'
import { tipeUnitStore } from '~/store/unit/tipe-unit'
// import { STATUSES } from '~/data/po-supplier'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'
import AclHandler from '~/mixins/acl-handler'
import DebounceHandler from '~/mixins/debounce-handler'

import helpers from '~/utils/helpers'

import arrowCounterClockwiseIcon from '/arrow-counter-clockwise.svg'

import StatusBadge from '~/components/general/status-badge/StatusBadge.vue'

import {
  ArrowDown,
  ArrowUp,
  Plus,
  Search,
  MoreFilled,
  Stamp,
  View,
  Document,
  Delete
} from '@element-plus/icons-vue'

export default {
  name: 'manajemen-po-supplier',

  mixins: [RouterHandler, ToastHandler, AclHandler, DebounceHandler],

  components: {
    PageHeader,
    StatusBadge,
    ArrowDown,
    ArrowUp,
    Plus,
    MoreFilled,
    Stamp,
    View,
    Document,
    Search
  },

  data () {
    return {
      filters: {
        search: this.$route.query.search || null
      },
      pagination: {
        page: parseInt(this.$route.query.page) || 1,
        size: 10
      },
      tipeUnits: [],
      POSuppliers: [],
      // statuses: STATUSES,
      totalPOSuppliers: 0,
      visibleFilter: false,
      visibleLoadingTable: false,
      icons: {
        delete: Delete,
        arrowCounterClockwise: arrowCounterClockwiseIcon
      },
      helpers
    }
  },

  computed: {
    totalShownPOSuppliers () {
      const totalItems = this.totalPOSuppliers
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
    this.getPOSuppliers()
    this.getTipeUnits()
  },

  methods: {
    ...mapActions(POSupplierStore, [
      'fetchPOSuppliers',
      'generatePDF'
    ]),
    ...mapActions(tipeUnitStore, ['fetchTipeUnits']),
    
    async getPOSuppliers () {
      this.visibleLoadingTable = true
      try {
        const { data } = await this.fetchPOSuppliers(this.generateFilters)
        this.POSuppliers = JSON.parse(JSON.stringify(data.data))
        this.totalPOSuppliers = data.pagination.total_items
      } catch (error) {
        this.showErrorResponse(error)
      } finally {
        this.visibleLoadingTable = false
      }
    },

    async getTipeUnits () {
      try {
        const { data } = await this.fetchTipeUnits({
          skip_pagination: true
        })
        this.tipeUnits = JSON.parse(JSON.stringify(data))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    handlePageChange (page) {
      this.pagination.page = page
      this.setRouteParam('ManajemenPOSupplier', { ...this.query, ...this.filters, ...this.pagination })
      this.getPOSuppliers()
    },

    handleFilterChange () {
      if (this.filters.status === '') {
        this.filters.status = null
      }

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

    async generatePOSupplierPDF (id) {
      try {
        const { data } = await this.generatePDF({ id })
        const accessUrl = JSON.parse(JSON.stringify(data.access_url))
        window.open(accessUrl, '_blank');
        this.getPOSuppliers()
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    openDocumentInNewTab (accessUrl) {
      window.open(accessUrl, '_blank');
    },

    async openModalConfirmation (id) {
      try {
        await this.$confirm(
          'Apakah anda yakin ingin menghapus PO Supplier ini? Tindakan yang sudah dilakukan tidak dapat diubah. Menghapus PO Supplier berarti menghilangkan progress data dan akses mereka',
          'Hapus PO Supplier',
          {
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            type: 'warning',
            showClose: true
          }
        )
        await this.handleDeletePOSupplier(id)
        this.showToast('PO Supplier berhasil dihapus!')
      } catch (e) {}
    },

    async handleDeletePOSupplier(id) {
      try {
        await this.deletePOSupplier(id)
        this.getPOSuppliers()
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToCreatePage () {
      this.redirectTo('ManajemenPOSupplierCreate')
    },

    goToDetailPage ({ id }) {
      this.redirectTo('ManajemenPOSupplierDetail', {
        params: {
          id: id
        }
      })
    },

    goToEditPage (id) {
      this.redirectTo('ManajemenPOSupplierEdit', {
        params: {
          id: id
        }
      })
    }
  }
}
