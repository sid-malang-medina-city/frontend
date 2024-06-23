import { mapActions } from 'pinia'
import { unitStore } from '~/store/unit'
import { clusterStore } from '~/store/unit/cluster'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import StatusBadge from '~/components/general/status-badge/StatusBadge.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'
import AclHandler from '~/mixins/acl-handler'
import DebounceHandler from '~/mixins/debounce-handler'
import helpers from '~/utils/helpers'

import { STATUSES } from '~/data/unit'

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
  name: 'manajemen-unit',

  mixins: [RouterHandler, ToastHandler, AclHandler, DebounceHandler],

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
        cluster: this.$route.query.cluster || null,
        search: this.$route.query.search || null,
        min_price: this.$route.query.min_price || null,
        max_price:this.$route.query.max_price || null,
        status: this.$route.query.status || null,
      },
      pagination: {
        page: parseInt(this.$route.query.page) || 1,
        size: 10
      },
      state: {
        // 是否添加排序样式(Whether to add a sort style)
        mark: false,
        order: [],
      },
      minPrice: 0,
      maxPrice: 0,
      priceRange: [0, 0],
      units: [],
      totalUnits: 0,
      visibleFilter: false,
      visibleLoadingTable: false,
      icons: {
        delete: Delete,
        edit: Edit,
        arrowCounterClockwise: arrowCounterClockwiseIcon
      },
      clusters: [],
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
    },

    isAnyFilterApplied () {
      return Object.keys(this.filters).some(key => !!this.filters[key])
    }
  },

  created () {
    this.visibleFilter = this.isAnyFilterApplied
    this.getClusters()
    this.getUnits()
  },

  methods: {
    ...mapActions(unitStore, [
      'fetchUnits',
      'deleteUnit'
    ]),
    ...mapActions(clusterStore, ['fetchClusters']),

    async getClusters () {
      try {
        const { data } = await this.fetchClusters({ skip_pagination: true })
        this.clusters = JSON.parse(JSON.stringify(data))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    async getUnits () {
      this.visibleLoadingTable = true
      try {
        const { data } = await this.fetchUnits(this.generateFilters)
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

    handleHeaderClass ({ column }) {
      console.log(column.multiOrder, column.property, this.state.mark)
      column.order = this.state.mark ? column.multiOrder : null
    },

    handlePageChange (page) {
      this.pagination.page = page
      this.setRouteParam('ManajemenUnit', { ...this.query, ...this.filters, ...this.pagination })
      this.getUnits()
    },

    handleSortChange ({ column, prop, order }) {
      if (!column.multiOrder) {
        column.multiOrder = 'ascending'
      } else if (column.multiOrder === 'ascending') {
        column.multiOrder = 'descending'
      } else {
        column.multiOrder = null
      }
      this.handleOrderChange(column)
    },

    handleOrderChange ({ multiOrder, property, index }) {
      const tmp = multiOrder === 'descending' ? 'DESC' : 'ASC'
      this.state.order = this.state.order.filter((item) => !item.includes(property))
      // 删除为null的排序
      // prop:["revenue ASC","day DESC"] ascending descending
      this.state.order.push(`${property} ${tmp}`)
      // 不排序则删除 (not sorted)
      if (!multiOrder) {
        this.state.order.pop()
      }
    
      console.log(this.state.order, property)
      this.state.mark = true
      // getTableData()
    },

    handleFilterChange () {
      if (this.filters.status === '') {
        this.filters.status = null
      }
      
      if (this.filters.cluster === '') {
        this.filters.cluster = null
      }

      this.filters.min_price = this.priceRange[0]
      this.filters.max_price = this.priceRange[1]
      this.handlePageChange(1)
    },

    toggleFilter () {
      this.visibleFilter = !this.visibleFilter
    },

    clearFilters () {
      Object.keys(this.filters).forEach(filter => {
        this.filters[filter] = null
      })
      this.initPriceRange()
      this.handleFilterChange()
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
