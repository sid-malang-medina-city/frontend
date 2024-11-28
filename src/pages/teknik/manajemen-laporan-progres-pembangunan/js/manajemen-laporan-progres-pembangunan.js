import { mapActions } from 'pinia'
import { laporanProgresPembangunanStore } from '~/store/teknik/laporan-progres-pembangunan'
import { tipeUnitStore } from '~/store/unit/tipe-unit'

import { STATUSES } from '~/data/lpp'
import { PAYMENT_STATUSES } from '~/data/lpp'

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
  name: 'manajemen-laporan-progres-pembangunan',

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
        tipe_unit: this.$route.query.tipe_unit || null,
        start_tanggal: this.$route.query.start_tanggal || null,
        end_tanggal: this.$route.query.end_tanggal || null,
        status: this.$route.query.status || null,
        status_pembayaran: this.$route.query.status_pembayaran || null,
      },
      pagination: {
        page: parseInt(this.$route.query.page) || 1,
        size: 10
      },
      bulanValue: null,
      laporanProgresPembangunans: [],
      tipeUnits: [],
      totalLaporanProgresPembangunans: 0,
      visibleFilter: false,
      visibleLoadingTable: false,
      statuses: STATUSES,
      paymentStatuses: PAYMENT_STATUSES,
      icons: {
        delete: Delete,
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
    this.initFilters()
    this.getTipeUnits()
    this.getLaporanProgresPembangunans()
  },

  methods: {
    ...mapActions(laporanProgresPembangunanStore, [
      'fetchLaporanProgresPembangunans',
      'deleteLaporanProgresPembangunan',
      'generatePDF'
    ]),
    ...mapActions(tipeUnitStore, ['fetchTipeUnits']),

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

    initFilters () {
      this.bulanValue = [this.filters.start_tanggal, this.filters.end_tanggal]
    },

    handlePageChange (page) {
      this.pagination.page = page
      this.setRouteParam('ManajemenLaporanProgresPembangunan', { ...this.query, ...this.filters, ...this.pagination })
      this.getLaporanProgresPembangunans()
    },

    handleMonthRangeChange () {
      this.filters.start_tanggal = this.bulanValue[0]
      this.filters.end_tanggal = this.bulanValue[1]
      this.handleFilterChange()
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
      this.bulanValue = null
      this.handleFilterChange()
    },

    async generateLaporanProgresPembangunanPDF (id, type) {
      try {
        const { data } = await this.generatePDF({ id, type })
        const accessUrl = JSON.parse(JSON.stringify(data.access_url))
        window.open(accessUrl, '_blank');
        this.getLaporanProgresPembangunans()
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
          'Apakah anda yakin ingin menghapus laporan progres pembangunan ini? Tindakan yang sudah dilakukan tidak dapat diubah. Menghapus laporan progres pembangunan berarti menghilangkan progres data LPP',
          'Hapus Laporan Progres Pembangunan',
          {
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            type: 'warning',
            showClose: true
          }
        )
        await this.handleDeleteLaporanProgresPembangunan(id)
        this.showToast('Laporan progres pembangunan berhasil dihapus!')
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
      this.redirectTo('ManajemenLaporanProgresPembangunanDetail', {
        params: {
          id: id
        }
      })
    },

    goToEditPage (id) {
      this.redirectTo('ManajemenLaporanProgresPembangunanEdit', {
        params: {
          id: id
        }
      })
    },

    calculateTermin (row) {
      return (new Date(row.tanggal).getMonth() - new Date(row.spk_awal_periode).getMonth() + 12 * (new Date(row.tanggal).getYear() - new Date(row.spk_awal_periode).getYear())) + 1
    },

    getMonth (date) {
      // return new Date(date).getMonth() - 
      const options = {
        year: "numeric",
        month: "long"
      }

      
      return new Date(date).toLocaleDateString('in', options)
    }
  }
}
