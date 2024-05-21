import { mapActions } from 'pinia'
import { SPKNonUnitStore } from '~/store/teknik/spk-non-unit'
import { tipeUnitStore } from '~/store/unit/tipe-unit'

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
  name: 'manajemen-spk-non-unit',

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
        search: this.$route.query.search || null,
        tipe_unit: this.$route.query.tipe_unit || null
      },
      pagination: {
        page: 1,
        size: 10
      },
      tipeUnits: [],
      SPKNonUnits: [],
      // statuses: STATUSES,
      totalSPKNonUnits: 0,
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
    totalShownSPKNonUnits () {
      const totalItems = this.totalSPKNonUnits
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
    this.getSPKNonUnits()
    this.getTipeUnits()
  },

  methods: {
    ...mapActions(SPKNonUnitStore, [
      'fetchSPKNonUnits',
      'deleteSPKNonUnit',
      'generatePDF'
    ]),
    ...mapActions(tipeUnitStore, ['fetchTipeUnits']),
    
    async getSPKNonUnits () {
      this.visibleLoadingTable = true
      try {
        const { data } = await this.fetchSPKNonUnits(this.generateFilters)
        this.SPKNonUnits = JSON.parse(JSON.stringify(data.data))
        this.totalSPKNonUnits = data.pagination.total_items
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
      this.getSPKNonUnits()
    },

    handleFilterChange () {
      if (this.filters.status === '') {
        this.filters.status = null
      }

      this.setRouteParam('ManajemenSPKNonUnit', { ...this.query, ...this.filters })
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

    async generateSPKNonUnitPDF (id) {
      try {
        const { data } = await this.generatePDF({ id })
        const accessUrl = JSON.parse(JSON.stringify(data.access_url))
        window.open(accessUrl, '_blank');
        this.getSPKNonUnits()
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
          'Apakah anda yakin ingin menghapus SPK Non Unit ini? Tindakan yang sudah dilakukan tidak dapat diubah. Menghapus SPK Non Unit berarti menghilangkan data SPK Non Unit dan LPP Non Unit yang ada',
          'Hapus SPK Non Unit',
          {
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            type: 'warning',
            showClose: true
          }
        )
        await this.handleDeleteSPKNonUnit(id)
        this.showToast('SPK Non Unit berhasil dihapus!')
      } catch (e) {}
    },

    async handleDeleteSPKNonUnit(id) {
      try {
        await this.deleteSPKNonUnit(id)
        this.getSPKNonUnits()
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToCreatePage () {
      this.redirectTo('ManajemenSPKNonUnitCreate')
    },

    goToDetailPage ({ id }) {
      this.redirectTo('ManajemenSPKNonUnitDetail', {
        params: {
          id: id
        }
      })
    },

    goToEditPage (id) {
      this.redirectTo('ManajemenSPKNonUnitEdit', {
        params: {
          id: id
        }
      })
    }
  }
}
