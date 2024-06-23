import { mapActions } from 'pinia'
import { pekerjaanStore } from '~/store/verifikasi/pekerjaan'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'
import AclHandler from '~/mixins/acl-handler'
import DebounceHandler from '~/mixins/debounce-handler'

import {
  ArrowDown,
  ArrowUp,
  Plus,
  Search,
  Edit,
  Delete
} from '@element-plus/icons-vue'

export default {
  name: 'manajemen-pekerjaan',

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
      },
      pagination: {
        page: parseInt(this.$route.query.page) || 1,
        size: 10
      },
      pekerjaans: [],
      totalPekerjaans: 0,
      visibleFilter: false,
      visibleLoadingTable: false,
      icons: {
        delete: Delete,
        edit: Edit
      }
    }
  },

  computed: {
    totalShownPekerjaans () {
      const totalItems = this.totalPekerjaans
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
    this.visibleFilter = !!this.filters.search
    this.getPekerjaans()
  },

  methods: {
    ...mapActions(pekerjaanStore, [
      'fetchPekerjaans',
      'deletePekerjaan'
    ]),

    async getPekerjaans () {
      this.visibleLoadingTable = true
      try {
        const { data } = await this.fetchPekerjaans(this.generateFilters)
        this.pekerjaans = JSON.parse(JSON.stringify(data.data))
        this.totalPekerjaans = data.pagination.total_items
      } catch (error) {
        this.showErrorResponse(error)
      } finally {
        this.visibleLoadingTable = false
      }
    },

    handlePageChange (page) {
      this.pagination.page = page
      this.setRouteParam('ManajemenPekerjaan', { ...this.query, ...this.filters, ...this.pagination })
      this.getPekerjaans()
    },

    handleFilterChange () {
      this.handlePageChange(1)
    },

    toggleFilter () {
      this.visibleFilter = !this.visibleFilter
    },

    async openModalConfirmation (id) {
      try {
        await this.$confirm(
          'Apakah anda yakin ingin menghapus pekerjaan ini? Tindakan yang sudah dilakukan tidak dapat diubah. Menghapus pekerjaan berarti menghilangkan progress data dan akses mereka',
          'Hapus Pekerjaan',
          {
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            type: 'warning',
            showClose: true
          }
        )
        await this.handleDeletePekerjaan(id)
        this.showToast('Pekerjaan berhasil dihapus!')
      } catch (e) {}
    },

    async handleDeletePekerjaan(id) {
      try {
        await this.deletePekerjaan(id)
        this.getPekerjaans()
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToCreatePage () {
      this.redirectTo('ManajemenPekerjaanCreate')
    },
    
    goToEditPage (id) {
      this.redirectTo('ManajemenPekerjaanEdit', {
        params: {
          id: id
        }
      })
    }
  }
}
