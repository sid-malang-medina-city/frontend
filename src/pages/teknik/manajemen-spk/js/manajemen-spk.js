import { mapActions } from 'pinia'
import { SPKStore } from '~/store/teknik/spk'
import { tipeUnitStore } from '~/store/unit/tipe-unit'
import { STATUSES } from '~/data/spk'

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
  Edit,
  Delete
} from '@element-plus/icons-vue'

export default {
  name: 'manajemen-spk',

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
        search: this.$route.query.search || null,
        tipe_unit: this.$route.query.tipe_unit || null
      },
      pagination: {
        page: 1,
        size: 10
      },
      tipeUnits: [],
      SPKs: [],
      statuses: STATUSES,
      totalSPKs: 0,
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
    totalShownSPKs () {
      const totalItems = this.totalSPKs
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
    this.getSPKs()
    this.getTipeUnits()
  },

  methods: {
    ...mapActions(SPKStore, [
      'fetchSPKs',
      'deleteSPK'
    ]),
    ...mapActions(tipeUnitStore, ['fetchTipeUnits']),
    
    async getSPKs () {
      this.visibleLoadingTable = true
      try {
        const { data } = await this.fetchSPKs(this.generateFilters)
        this.SPKs = JSON.parse(JSON.stringify(data.data))
        this.totalSPKs = data.pagination.total_items
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
      } finally {
        this.visibleLoadingTable = false
      }
    },

    handlePageChange (page) {
      this.pagination.page = page
      this.getSPKs()
    },

    handleFilterChange () {
      if (this.filters.status === '') {
        this.filters.status = null
      }

      this.setRouteParam('ManajemenSPK', { ...this.query, ...this.filters })
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
          'Apakah anda yakin ingin menghapus  SPK ini? Tindakan yang sudah dilakukan tidak dapat diubah. Menghapus  SPK berarti menghilangkan progress data dan akses mereka',
          'Hapus SPK',
          {
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            type: 'warning',
            showClose: true
          }
        )
        await this.handleDeleteSPK(id)
        this.showToast('SPK berhasil dihapus!')
      } catch (e) {}
    },

    async handleDeleteSPK(id) {
      try {
        await this.deleteSPK(id)
        this.getSPKs()
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToCreatePage () {
      this.redirectTo('ManajemenSPKCreate')
    },

    goToDetailPage ({ id }) {
      // this.redirectTo('ManajemenSPKDetail', {
      //   params: {
      //     id: id
      //   }
      // })
    },

    goToEditPage (id) {
      this.redirectTo('ManajemenSPKEdit', {
        params: {
          id: id
        }
      })
    }
  }
}
