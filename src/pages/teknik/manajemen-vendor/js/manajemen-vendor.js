import { mapActions } from 'pinia'
import { vendorStore } from '~/store/teknik/vendor'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'
import AclHandler from '~/mixins/acl-handler'
import DebounceHandler from '~/mixins/debounce-handler'

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
  name: 'manajemen-vendor',

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
        search: this.$route.query.search || null
      },
      pagination: {
        page: 1,
        size: 10
      },
      // statuses: STATUS_MARKETER,
      vendors: [],
      totalVendors: 0,
      visibleFilter: false,
      visibleLoadingTable: false,
      icons: {
        delete: Delete,
        edit: Edit,
        arrowCounterClockwise: arrowCounterClockwiseIcon
      }
    }
  },

  computed: {
    totalShownVendors () {
      const totalItems = this.totalVendors
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
    this.getVendors()
  },

  methods: {
    ...mapActions(vendorStore, [
      'fetchVendors',
      'deleteVendor'
    ]),

    async getVendors () {
      this.visibleLoadingTable = true
      try {
        const { data } = await this.fetchVendors(this.generateFilters)
        this.vendors = JSON.parse(JSON.stringify(data.data))
        this.totalVendors = data.pagination.total_items
      } catch (error) {
        this.showErrorResponse(error)
      } finally {
        this.visibleLoadingTable = false
      }
    },

    handlePageChange (page) {
      this.pagination.page = page
      this.getVendors()
    },

    handleFilterChange () {
      if (this.filters.status === '') {
        this.filters.status = null
      }

      this.setRouteParam('ManajemenVendor', { ...this.query, ...this.filters })
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

    async openModalConfirmation (id) {
      try {
        await this.$confirm(
          'Apakah anda yakin ingin menghapus vendor ini? Tindakan yang sudah dilakukan tidak dapat diubah. Menghapus vendor berarti menghilangkan progress data dan akses mereka',
          'Hapus Vendor',
          {
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            type: 'warning',
            showClose: true
          }
        )
        await this.handleDeleteVendor(id)
        this.showToast('Vendor berhasil dihapus!')
      } catch (e) {}
    },

    async handleDeleteVendor(id) {
      try {
        await this.deleteVendor(id)
        this.getVendors()
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToCreatePage () {
      this.redirectTo('ManajemenVendorCreate')
    },

    goToDetailPage ({ id }) {
      // this.redirectTo('ManajemenVendorDetail', {
      //   params: {
      //     id: id
      //   }
      // })
    },

    goToEditPage (id) {
      this.redirectTo('ManajemenVendorEdit', {
        params: {
          id: id
        }
      })
    }
  }
}
