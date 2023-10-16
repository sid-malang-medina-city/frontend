import { mapActions } from 'pinia'
import { dokumenKonsumenStore } from '~/store/verifikasi/dokumen-konsumen'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'
import DebounceHandler from '~/mixins/debounce-handler'

import {
  ArrowDown,
  ArrowUp,
  Plus,
  Search,
  Edit,
  Delete
} from '@element-plus/icons-vue'

const STATUS_VERIFIKASI = {
  BOOKING: {
    name: 'Booking',
    code: 'BOOKING',
    color: '#1DC4F9'
  },
  TERJADWAL_VERIFIKASI: {
    name: 'Terjadwal verifikasi',
    code: 'TERJADWAL_VERIFIKASI',
    color: '#F91DBB'
  },
  TERVERIFIKASI: {
    name: 'Terverifikasi',
    code: 'TERVERIFIKASI',
    color: '#0B6BC4'
  },
  DITOLAK: {
    name: 'Ditolak',
    code: 'DITOLAK',
    color: '#C4C4C4'
  },
  CANCEL: {
    name: 'Cancel',
    code: 'CANCEL',
    color: '#FF613A'
  }
}

const STATUS_PEMBAYARAN = {
  BELUM_TERBAYAR: {
    name: 'Belum Terbayar',
    code: 'BELUM_TERBAYAR',
    color: '#C4C4C4'
  },
  DP1: {
    name: 'DP 1',
    code: 'DP1',
    color: '#F9CA1D'
  },
  DP1_PPJB: {
    name: 'DP1 + PPJB',
    code: 'DP1_PPJB',
    color: '#F9CA1D'
  },
  CASH_LUNAS: {
    name: 'Cash Lunas',
    code: 'CASH_LUNAS',
    color: '#74C627'
  },
  CASH_LUNAS_PPJB: {
    name: 'Cash Lunas + PPJB',
    code: 'CASH_LUNAS_PPJB',
    color: '#74C627'
  },
  REFUND_TERBAYAR: {
    name: 'Refund Terbayar',
    code: 'REFUND_TERBAYAR',
    color: '#559816'
  },
}

export default {
  name: 'manajemen-dokumen-konsumen',

  mixins: [RouterHandler, ToastHandler, DebounceHandler],

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
        search: this.$route.query.search || null,
        division: this.$route.query.division || null,
        role: this.$route.query.role || null,
      },
      pagination: {
        page: 1,
        size: 10
      },
      divisions: [],
      roles: [],
      dokumenKonsumens: [],
      totalDokumenKonsumens: 0,
      verificationStatuses: STATUS_VERIFIKASI,
      paymentStatuses: STATUS_PEMBAYARAN,
      visibleFilter: false,
      visibleLoadingTable: false,
      icons: {
        delete: Delete,
        edit: Edit
      }
    }
  },

  computed: {
    totalShownDokumenKonsumens () {
      const totalItems = this.totalDokumenKonsumens
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
    this.getDokumenKonsumens()
  },

  methods: {
    ...mapActions(dokumenKonsumenStore, [
      'fetchDokumenKonsumens'
    ]),

    async getDokumenKonsumens () {
      this.visibleLoadingTable = true
      try {
        const { data } = await this.fetchDokumenKonsumens(this.generateFilters)
        this.dokumenKonsumens = JSON.parse(JSON.stringify(data.data))
        this.totalDokumenKonsumens = data.pagination.total_items
      } catch (error) {
        this.showErrorResponse(error)
      } finally {
        this.visibleLoadingTable = false
      }
    },

    handlePageChange (page) {
      this.pagination.page = page
      this.getDokumenKonsumens()
    },

    handleFilterChange () {
      this.setRouteParam('ManajemenDokumenKonsumen', { ...this.query, ...this.filters })
      this.handlePageChange(1)
    },

    toggleFilter () {
      this.visibleFilter = !this.visibleFilter
    },

    goToEditPage (id) {
      this.redirectTo('ManajemenDokumenKonsumenEdit', {
        params: {
          id: id
        }
      })
    },

    goToDetailPage ({ id }) {
      this.redirectTo('ManajemenDokumenKonsumenDetail', {
        params: {
          id: id
        }
      })
    }
  }
}
