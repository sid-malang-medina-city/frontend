import { mapActions } from 'pinia'
import { dokumenKonsumenStore } from '~/store/verifikasi/dokumen-konsumen'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'
import DebounceHandler from '~/mixins/debounce-handler'
import AclHandler from '~/mixins/acl-handler'

import {
  STATUS_VERIFIKASI,
  STATUS_PEMBAYARAN
} from '~/data/konsumen'

import imagesIcon from '/images.svg'
import arrowCounterClockwiseIcon from '/arrow-counter-clockwise.svg'

import {
  ArrowDown,
  ArrowUp,
  Plus,
  Search,
  Edit,
  Delete,
  Document,
  CircleCheckFilled,
  CircleCloseFilled
} from '@element-plus/icons-vue'


export default {
  name: 'manajemen-dokumen-konsumen',

  mixins: [RouterHandler, ToastHandler, DebounceHandler, AclHandler],

  components: {
    PageHeader,
    ArrowDown,
    ArrowUp,
    Plus,
    Search,
    Document,
    CircleCheckFilled,
    CircleCloseFilled
  },

  data () {
    return {
      filters: {
        search: this.$route.query.search || null,
        status_verifikasi: this.$route.query.status_verifikasi || null,
        status_pembayaran: this.$route.query.status_pembayaran || null,
        tanggal_booking_dari: this.$route.query.tanggal_booking_dari || null,
        tanggal_booking_sampai: this.$route.query.tanggal_booking_sampai || null
      },
      pagination: {
        page: 1,
        size: 10
      },
      tanggalBookingValue: null,
      dokumenKonsumens: [],
      totalDokumenKonsumens: 0,
      verificationStatuses: STATUS_VERIFIKASI,
      paymentStatuses: STATUS_PEMBAYARAN,
      visibleFilter: false,
      visibleLoadingTable: false,
      icons: {
        delete: Delete,
        edit: Edit,
        arrowCounterClockwise: arrowCounterClockwiseIcon
      },
      imagesIcon
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
    },

    isAnyFilterApplied () {
      return Object.keys(this.filters).some(key => !!this.filters[key])
    }
  },

  created () {
    this.visibleFilter = this.isAnyFilterApplied
    this.initFilters()
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

    initFilters () {
      this.tanggalBookingValue = [this.filters.tanggal_booking_dari, this.filters.tanggal_booking_sampai]
    },

    handlePageChange (page) {
      this.pagination.page = page
      this.getDokumenKonsumens()
    },

    handleDateRangeChange () {
      this.filters.tanggal_booking_dari = this.tanggalBookingValue[0]
      this.filters.tanggal_booking_sampai = this.tanggalBookingValue[1]
      this.handleFilterChange()
    },

    handleFilterChange () {
      if (this.filters.status_verifikasi === '') {
        this.filters.status_verifikasi = null
      }

      if (this.filters.status_pembayaran === '') {
        this.filters.status_pembayaran = null
      }

      this.setRouteParam('ManajemenDokumenKonsumen', { ...this.query, ...this.filters })
      this.handlePageChange(1)
    },

    toggleFilter () {
      this.visibleFilter = !this.visibleFilter
    },

    clearFilters () {
      Object.keys(this.filters).forEach(filter => {
        this.filters[filter] = null
      })
      this.tanggalBookingValue = null
      this.handleFilterChange()
    },

    openDocumentInNewTab (accessUrl) {
      window.open(accessUrl, '_blank');
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
    },

    goToKonsumenDetailPage (id) {
      this.redirectTo('ManajemenKonsumenDetail', {
        params: {
          id: id
        }
      })
    },
    
    goToMarketerDetailPage (id) {
      this.redirectTo('ManajemenMarketerDetail', {
        params: {
          id: id
        }
      })
    },
    
    goToLaporanMarketingDetailPage (id) {
      this.redirectTo('LaporanMarketingDetail', {
        params: {
          id: id
        }
      })
    },

    goToUnitDetailPage (id) {
      this.redirectTo('ManajemenUnitDetail', {
        params: {
          id: id
        }
      })
    }
  }
}
