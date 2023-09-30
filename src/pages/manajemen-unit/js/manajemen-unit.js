import { mapActions } from 'pinia'
import { unitStore } from '~/store/unit'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import StatusBadge from '~/components/general/status-badge/StatusBadge.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'
import helpers from '~/utils/helpers'

import {
  ArrowDown,
  ArrowUp,
  Plus,
  Search,
  Edit,
  Delete
} from '@element-plus/icons-vue'

const STATUS_COLORS = {
  'Booking': '#0BB1C4',
  'Terjual': '#9D27C6',
  'Tersedia': '#74C627'
}

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
        lotNumber: this.$route.query.lotNumber || null,
        minPrice: this.$route.query.minPrice || null,
        maxPrice:this.$route.query.maxPrice || null,
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
      statusColors: STATUS_COLORS,
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
    }
  },

  created () {
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
        this.units = JSON.parse(JSON.stringify(data.data.units))
        this.totalUnits = data.pagination.totalUnits
        this.initPriceRange(data.data)
      } catch (error) {
        this.showErrorResponse(error)
      } finally {
        this.visibleLoadingTable = false
      }
    },

    initPriceRange (data) {
      this.minPrice = data.minPrice
      this.maxPrice = data.maxPrice

      if (this.filters.minPrice || this.filters.maxPrice) {
        this.priceRange = [+this.filters.minPrice, +this.filters.maxPrice]
        return
      }

      this.priceRange = [this.minPrice, this.maxPrice]
    },

    handlePageChange (page) {
      this.pagination.page = page
      this.getUnits()
    },

    handleFilterChange () {
      this.filters.minPrice = this.priceRange[0]
      this.filters.maxPrice = this.priceRange[1]
      this.setRouteParam('ManajemenUnit', { ...this.query, ...this.filters })
      this.getUnits()
    },

    toggleFilter () {
      this.visibleFilter = !this.visibleFilter
    },

    async openModalConfirmation (lotNumber) {
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
        await this.handleDeleteUnit(lotNumber)
        this.showToast('Unit berhasil dihapus!')
      } catch (e) {
        this.showErrorResponse(e)
      }
    },

    async handleDeleteUnit(lotNumber) {
      try {
        await this.deleteUnit({ lotNumber: lotNumber })
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToManajemenUnitCreate () {
      this.redirectTo('ManajemenUnitCreate')
    }
  }
}
