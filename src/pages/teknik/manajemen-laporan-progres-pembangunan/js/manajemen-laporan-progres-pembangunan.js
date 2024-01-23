import { mapActions } from 'pinia'
import { laporanProgresPembangunanStore } from '~/store/teknik/laporan-progres-pembangunan'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'
import AclHandler from '~/mixins/acl-handler'
import DebounceHandler from '~/mixins/debounce-handler'

import helpers from '~/utils/helpers'

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
  name: 'manajemen-laporan-progres-pembangunan',

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
      laporanProgresPembangunans: [],
      totalLaporanProgresPembangunans: 0,
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
    totalShownLaporanProgresPembangunans () {
      const totalItems = this.totalLaporanProgresPembangunans
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
    this.getLaporanProgresPembangunans()
  },

  methods: {
    ...mapActions(laporanProgresPembangunanStore, [
      'fetchLaporanProgresPembangunans',
      'deleteLaporanProgresPembangunan'
    ]),

    async getLaporanProgresPembangunans () {
      this.visibleLoadingTable = true
      try {
        const { data } = await this.fetchLaporanProgresPembangunans(this.generateFilters)
        this.laporanProgresPembangunans = JSON.parse(JSON.stringify(data.data))
        this.totalLaporanProgresPembangunans = data.pagination.total_items
      } catch (error) {
        this.showErrorResponse(error)
      } finally {
        this.visibleLoadingTable = false
      }
    },

    handlePageChange (page) {
      this.pagination.page = page
      this.getLaporanProgresPembangunans()
    },

    handleFilterChange () {
      if (this.filters.status === '') {
        this.filters.status = null
      }

      this.setRouteParam('ManajemenLaporanProgresPembangunan', { ...this.query, ...this.filters })
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
          'Apakah anda yakin ingin menghapus laporan progres pembangunan ini? Tindakan yang sudah dilakukan tidak dapat diubah. Menghapus laporan progres pembangunan berarti menghilangkan progres data dan akses mereka',
          'Hapus LaporanProgresPembangunan',
          {
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            type: 'warning',
            showClose: true
          }
        )
        await this.handleDeleteLaporanProgresPembangunan(id)
        this.showToast('Laporan pembangunan berhasil dihapus!')
      } catch (e) {}
    },

    async handleDeleteLaporanProgresPembangunan(id) {
      try {
        await this.deleteLaporanProgresPembangunan(id)
        this.getLaporanProgresPembangunans()
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToCreatePage () {
      this.redirectTo('ManajemenLaporanProgresPembangunanCreate')
    },

    goToDetailPage ({ id }) {
      // this.redirectTo('ManajemenLaporanProgresPembangunanDetail', {
      //   params: {
      //     id: id
      //   }
      // })
    },

    goToEditPage (id) {
      this.redirectTo('ManajemenLaporanProgresPembangunanEdit', {
        params: {
          id: id
        }
      })
    }
  }
}
