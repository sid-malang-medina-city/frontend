import { mapActions } from 'pinia'
import { unitStore } from '~/store/unit'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import StatusBadge from '~/components/general/status-badge/StatusBadge.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'
import helpers from '~/utils/helpers'
import { STATUSES } from '~/data/unit'

import {
  ArrowDown,
  ArrowUp,
  Plus,
  Search,
  Edit,
  Delete
} from '@element-plus/icons-vue'

export default {
  name: 'manajemen-unit',

  mixins: [RouterHandler, ToastHandler],

  components: {
    PageHeader,
    StatusBadge,
    ArrowDown,
    ArrowUp,
    Plus,
    Search
  },

  data () {
    return {
      filters: {
        search: this.$route.query.search || null,
        min_price: this.$route.query.min_price || null,
        max_price:this.$route.query.max_price || null,
        status: this.$route.query.status || null,
      },
      pagination: {
        page: 1,
        size: 10
      },
      minPrice: 0,
      maxPrice: 0,
      priceRange: [0, 0],
      statuses: [],
      units: [],
      totalUnits: 0,
      visibleFilter: false,
      visibleLoadingTable: false,
      icons: {
        delete: Delete,
        edit: Edit
      },
      statuses: STATUSES,
      helpers
    }
  },

  computed: {
    totalShownUnits () {
      const totalItems = this.totalUnits
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
    this.visibleFilter = Object.keys(this.filters).some(key => !!this.filters[key])
    this.getUnits()
  },

  methods: {
    ...mapActions(unitStore, [
      'fetchUnits',
      'deleteUnit'
    ]),

    async getUnits () {
      this.visibleLoadingTable = true
      try {
        const { data } = await this.fetchUnits(this.filters)
        this.units = JSON.parse(JSON.stringify(data.data))
        this.totalUnits = data.pagination.total_items
        this.initPriceRange(data.data)
      } catch (error) {
        this.showErrorResponse(error)
      } finally {
        this.visibleLoadingTable = false
      }
    },

    initPriceRange () {
      this.minPrice = 0
      this.maxPrice = 5000000000

      if (this.filters.min_price || this.filters.max_price) {
        this.priceRange = [+this.filters.min_price, +this.filters.max_price]
        return
      }

      this.priceRange = [this.minPrice, this.maxPrice]
    },

    handlePageChange (page) {
      this.pagination.page = page
      this.getUnits()
    },

    handleFilterChange () {
      this.filters.min_price = this.priceRange[0]
      this.filters.max_price = this.priceRange[1]
      this.setRouteParam('ManajemenUnit', { ...this.query, ...this.filters })
      this.getUnits()
    },

    toggleFilter () {
      this.visibleFilter = !this.visibleFilter
    },

    async openModalConfirmation (id) {
      try {
        await this.$confirm(
          'Apakah anda yakin ingin menghapus unit ini? Tindakan yang sudah dilakukan tidak dapat diubah',
          'Hapus Unit',
          {
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            type: 'warning',
            showClose: true
          }
        )
        await this.handleDeleteUnit(id)
        this.showToast('Unit berhasil dihapus!')
      } catch (e) {
        this.showErrorResponse(e)
      }
    },

    async handleDeleteUnit(id) {
      try {
        await this.deleteUnit(id)
        this.getUnits()
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToManajemenUnitCreate () {
      this.redirectTo('ManajemenUnitCreate')
    },

    goToDetailPage ({ id }) {
      this.redirectTo('ManajemenUnitDetail', {
        params: {
          id: id
        }
      })
    },
    
    goToEditPage ( id ) {
      this.redirectTo('ManajemenUnitEdit', {
        params: {
          id: id
        }
      })
    }
  }
}
