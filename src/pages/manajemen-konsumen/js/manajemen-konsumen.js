import { mapActions } from 'pinia'
import { konsumenStore } from '~/store/konsumen'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'
import AclHandler from '~/mixins/acl-handler'
import DebounceHandler from '~/mixins/debounce-handler'

import { STATUS_KONSUMEN } from '~/data/konsumen'

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
  name: 'manajemen-konsumen',

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
        search: this.$route.query.search || null,
        status: this.$route.query.status || null
      },
      pagination: {
        page: 1,
        size: 10
      },
      statuses: STATUS_KONSUMEN,
      konsumens: [],
      totalKonsumens: 0,
      visibleFilter: false,
      visibleLoadingTable: false,
      icons: {
        delete: Delete,
        edit: Edit,
        arrowCounterClockwise: arrowCounterClockwiseIcon
      }
    }
  },

  computed: {
    totalShownKonsumens () {
      const totalItems = this.totalKonsumens
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
    this.getKonsumens()
  },

  methods: {
    ...mapActions(konsumenStore, [
      'fetchKonsumens',
      'deleteKonsumen'
    ]),

    async getKonsumens () {
      this.visibleLoadingTable = true
      try {
        const { data } = await this.fetchKonsumens(this.generateFilters)
        this.konsumens = JSON.parse(JSON.stringify(data.data))
        this.totalKonsumens = data.pagination.total_items
      } catch (error) {
        this.showErrorResponse(error)
      } finally {
        this.visibleLoadingTable = false
      }
    },

    handlePageChange (page) {
      this.pagination.page = page
      this.getKonsumens()
    },

    handleFilterChange () {
      if (this.filters.status === '') {
        this.filters.status = null
      }

      this.setRouteParam('ManajemenKonsumen', { ...this.query, ...this.filters })
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
          'Apakah anda yakin ingin menghapus konsumen ini? Tindakan yang sudah dilakukan tidak dapat diubah. Menghapus konsumen berarti menghilangkan progress data dan akses mereka',
          'Hapus Konsumen',
          {
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            type: 'warning',
            showClose: true
          }
        )
        await this.handleDeleteKonsumen(id)
        this.showToast('Konsumen berhasil dihapus!')
      } catch (e) {}
    },

    async handleDeleteKonsumen(id) {
      try {
        await this.deleteKonsumen(id)
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToCreatePage () {
      this.redirectTo('ManajemenKonsumenCreate')
    },
    
    goToDetailPage ({ id }) {
      this.redirectTo('ManajemenKonsumenDetail', {
        params: {
          id: id
        }
      })
    },

    goToEditPage (id) {
      this.redirectTo('ManajemenKonsumenEdit', {
        params: {
          id: id
        }
      })
    }
  }
}
