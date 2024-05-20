import { mapActions } from 'pinia'
import { laporanProgresPembangunanNonUnitStore } from '~/store/teknik/laporan-progres-pembangunan-non-unit'

import { STATUSES } from '~/data/spk'

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
  MoreFilled,
  Stamp,
  View,
  Document,
  Delete
} from '@element-plus/icons-vue'

export default {
  name: 'manajemen-laporan-progres-pembangunan-non-unit',

  mixins: [RouterHandler, ToastHandler, AclHandler, DebounceHandler],

  components: {
    PageHeader,
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
        start_tanggal: this.$route.query.start_tanggal || null,
        end_tanggal: this.$route.query.end_tanggal || null,
      },
      pagination: {
        page: 1,
        size: 10
      },
      tanggalValue: null,
      laporanProgresPembangunanNonUnits: [],
      totalLaporanProgresPembangunanNonUnits: 0,
      visibleFilter: false,
      visibleLoadingTable: false,
      statuses: STATUSES,
      icons: {
        delete: Delete,
        arrowCounterClockwise: arrowCounterClockwiseIcon
      },
      helpers
    }
  },

  computed: {
    totalShownLaporanProgresPembangunanNonUnits () {
      const totalItems = this.totalLaporanProgresPembangunanNonUnits
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
    this.initFilters()
    this.getLaporanProgresPembangunanNonUnits()
  },

  methods: {
    ...mapActions(laporanProgresPembangunanNonUnitStore, [
      'fetchLaporanProgresPembangunanNonUnits',
      'generatePDF'
    ]),

    async getLaporanProgresPembangunanNonUnits () {
      this.visibleLoadingTable = true
      try {
        const { data } = await this.fetchLaporanProgresPembangunanNonUnits(this.generateFilters)
        this.laporanProgresPembangunanNonUnits = JSON.parse(JSON.stringify(data.data))
        this.totalLaporanProgresPembangunanNonUnits = data.pagination.total_items
      } catch (error) {
        this.showErrorResponse(error)
      } finally {
        this.visibleLoadingTable = false
      }
    },

    initFilters () {
      this.tanggalValue = [this.filters.start_tanggal, this.filters.end_tanggal]
    },

    handlePageChange (page) {
      this.pagination.page = page
      this.getLaporanProgresPembangunanNonUnits()
    },

    handleTanggalRangeChange () {
      this.filters.start_tanggal = this.tanggalValue[0]
      this.filters.end_tanggal = this.tanggalValue[1]
      this.handleFilterChange()
    },

    handleFilterChange () {
      if (this.filters.status === '') {
        this.filters.status = null
      }

      this.setRouteParam('ManajemenLaporanProgresPembangunanNonUnit', { ...this.query, ...this.filters })
      this.handlePageChange(1)
    },

    toggleFilter () {
      this.visibleFilter = !this.visibleFilter
    },

    clearFilters () {
      Object.keys(this.filters).forEach(filter => {
        this.filters[filter] = null
      })
      this.tanggalValue = null
      this.handleFilterChange()
    },

    async generateLaporanProgresPembangunanNonUnitPDF (id, type) {
      try {
        const { data } = await this.generatePDF({ id, type })
        const accessUrl = JSON.parse(JSON.stringify(data.access_url))
        window.open(accessUrl, '_blank');
        this.getLaporanProgresPembangunanNonUnits()
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
          'Apakah anda yakin ingin menghapus laporan progres pembangunan ini? Tindakan yang sudah dilakukan tidak dapat diubah. Menghapus laporan progres pembangunan berarti menghilangkan progres data dan akses mereka',
          'Hapus Laporan Progres Pembangunan',
          {
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            type: 'warning',
            showClose: true
          }
        )
        await this.handleDeleteLaporanProgresPembangunanNonUnit(id)
        this.showToast('Laporan progres pembangunan berhasil dihapus!')
      } catch (e) {}
    },

    async handleDeleteLaporanProgresPembangunanNonUnit(id) {
      try {
        await this.deleteLaporanProgresPembangunanNonUnit(id)
        this.getLaporanProgresPembangunanNonUnits()
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToCreatePage () {
      this.redirectTo('ManajemenLaporanProgresPembangunanNonUnitCreate')
    },

    goToDetailPage ({ id }) {
      this.redirectTo('ManajemenLaporanProgresPembangunanNonUnitDetail', {
        params: {
          id: id
        }
      })
    },

    goToEditPage (id) {
      this.redirectTo('ManajemenLaporanProgresPembangunanNonUnitEdit', {
        params: {
          id: id
        }
      })
    }
  }
}
