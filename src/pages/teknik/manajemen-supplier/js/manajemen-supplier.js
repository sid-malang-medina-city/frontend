import { mapActions } from 'pinia'
import { supplierStore } from '~/store/teknik/supplier'

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
  name: 'manajemen-supplier',

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
      suppliers: [],
      totalSuppliers: 0,
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
    totalShownSuppliers () {
      const totalItems = this.totalSuppliers
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
    this.getSuppliers()
  },

  methods: {
    ...mapActions(supplierStore, [
      'fetchSuppliers',
      'deleteSupplier'
    ]),

    async getSuppliers () {
      this.visibleLoadingTable = true
      try {
        console.log(1)
        const { data } = await this.fetchSuppliers(this.generateFilters)
        console.log(2)
        this.suppliers = JSON.parse(JSON.stringify(data.data))
        console.log(3)
        this.totalSuppliers = data.pagination.total_items
      } catch (error) {
        this.showErrorResponse(error)
      } finally {
        this.visibleLoadingTable = false
      }
    },

    handlePageChange (page) {
      this.pagination.page = page
      this.getSuppliers()
    },

    handleFilterChange () {
      if (this.filters.status === '') {
        this.filters.status = null
      }

      this.setRouteParam('ManajemenSupplier', { ...this.query, ...this.filters })
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
          'Apakah anda yakin ingin menghapus supplier ini? Tindakan yang sudah dilakukan tidak dapat diubah. Menghapus supplier berarti menghilangkan progress data dan akses mereka',
          'Hapus Supplier',
          {
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            type: 'warning',
            showClose: true
          }
        )
        await this.handleDeleteSupplier(id)
        this.showToast('Supplier berhasil dihapus!')
      } catch (e) {}
    },

    async handleDeleteSupplier(id) {
      try {
        await this.deleteSupplier(id)
        this.getSuppliers()
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToCreatePage () {
      this.redirectTo('ManajemenSupplierCreate')
    },

    goToDetailPage ({ id }) {
      this.redirectTo('ManajemenSupplierDetail', {
        params: {
          id: id
        }
      })
    },

    goToEditPage (id) {
      this.redirectTo('ManajemenSupplierEdit', {
        params: {
          id: id
        }
      })
    }
  }
}
