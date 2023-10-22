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

import {
  ArrowDown,
  ArrowUp,
  Plus,
  Search,
  Edit,
  Delete
} from '@element-plus/icons-vue'


export default {
  name: 'manajemen-dokumen-konsumen',

  mixins: [RouterHandler, ToastHandler, DebounceHandler, AclHandler],

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
