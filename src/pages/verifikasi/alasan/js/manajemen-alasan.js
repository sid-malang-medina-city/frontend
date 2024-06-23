import { mapActions } from 'pinia'
import { alasanStore } from '~/store/verifikasi/alasan'

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
  name: 'manajemen-alasan',

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
      alasans: [],
      totalAlasans: 0,
      visibleFilter: false,
      visibleLoadingTable: false,
      icons: {
        delete: Delete,
        edit: Edit
      }
    }
  },

  computed: {
    totalShownAlasans () {
      const totalItems = this.totalAlasans
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
    this.getAlasans()
  },

  methods: {
    ...mapActions(alasanStore, [
      'fetchAlasans',
      'deleteAlasan'
    ]),

    async getAlasans () {
      this.visibleLoadingTable = true
      try {
        const { data } = await this.fetchAlasans(this.generateFilters)
        this.alasans = JSON.parse(JSON.stringify(data.data))
        this.totalAlasans = data.pagination.total_items
      } catch (error) {
        this.showErrorResponse(error)
      } finally {
        this.visibleLoadingTable = false
      }
    },

    handlePageChange (page) {
      this.pagination.page = page
      this.setRouteParam('ManajemenAlasan', { ...this.query, ...this.filters, ...this.pagination })
      this.getAlasans()
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
          'Apakah anda yakin ingin menghapus alasan ini? Tindakan yang sudah dilakukan tidak dapat diubah. Menghapus alasan berarti menghilangkan progress data dan akses mereka',
          'Hapus Alasan',
          {
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            type: 'warning',
            showClose: true
          }
        )
        await this.handleDeleteAlasan(id)
        this.showToast('Alasan berhasil dihapus!')
      } catch (e) {}
    },

    async handleDeleteAlasan(id) {
      try {
        await this.deleteAlasan(id)
        this.getAlasans()
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToCreatePage () {
      this.redirectTo('ManajemenAlasanCreate')
    },
    
    goToEditPage (id) {
      this.redirectTo('ManajemenAlasanEdit', {
        params: {
          id: id
        }
      })
    }
  }
}
