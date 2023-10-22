import { mapActions } from 'pinia'
import { marketerStore } from '~/store/marketing/marketer'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'
import AclHandler from '~/mixins/acl-handler'

import { STATUS_MARKETER } from '~/data/marketing'

import {
  ArrowDown,
  ArrowUp,
  Plus,
  Search,
  Edit,
  Delete
} from '@element-plus/icons-vue'

export default {
  name: 'manajemen-marketer',

  mixins: [RouterHandler, ToastHandler, AclHandler],

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
      statuses: STATUS_MARKETER,
      marketers: [],
      totalMarketers: 0,
      visibleFilter: false,
      visibleLoadingTable: false,
      icons: {
        delete: Delete,
        edit: Edit
      }
    }
  },

  computed: {
    totalShownMarketers () {
      const totalItems = this.totalMarketers
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
    this.getMarketers()
  },

  methods: {
    ...mapActions(marketerStore, [
      'fetchMarketers',
      'deleteMarketer'
    ]),

    async getMarketers () {
      this.visibleLoadingTable = true
      try {
        const { data } = await this.fetchMarketers(this.generateFilters)
        this.marketers = JSON.parse(JSON.stringify(data.data))
        this.totalMarketers = data.pagination.total_items
      } catch (error) {
        this.showErrorResponse(error)
      } finally {
        this.visibleLoadingTable = false
      }
    },

    handlePageChange (page) {
      this.pagination.page = page
      this.getMarketers()
    },

    handleFilterChange () {
      this.setRouteParam('ManajemenMarketer', { ...this.query, ...this.filters })
      this.handlePageChange(1)
    },

    toggleFilter () {
      this.visibleFilter = !this.visibleFilter
    },

    async openModalConfirmation (id) {
      try {
        await this.$confirm(
          'Apakah anda yakin ingin menghapus marketer ini? Tindakan yang sudah dilakukan tidak dapat diubah. Menghapus marketer berarti menghilangkan progress data dan akses mereka',
          'Hapus Marketer',
          {
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            type: 'warning',
            showClose: true
          }
        )
        await this.handleDeleteMarketer(id)
        this.showToast('Marketer berhasil dihapus!')
      } catch (e) {}
    },

    async handleDeleteMarketer(id) {
      try {
        await this.deleteMarketer(id)
        this.getMarketers()
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToCreatePage () {
      this.redirectTo('ManajemenMarketerCreate')
    },

    goToDetailPage ({ id }) {
      this.redirectTo('ManajemenMarketerDetail', {
        params: {
          id: id
        }
      })
    },

    goToEditPage (id) {
      this.redirectTo('ManajemenMarketerEdit', {
        params: {
          id: id
        }
      })
    }
  }
}
