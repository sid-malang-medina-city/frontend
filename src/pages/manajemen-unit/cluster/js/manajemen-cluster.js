import { mapActions } from 'pinia'
import { clusterStore } from '~/store/unit/cluster'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'
import AclHandler from '~/mixins/acl-handler'

import {
  ArrowDown,
  ArrowUp,
  Plus,
  Search,
  Edit,
  Delete
} from '@element-plus/icons-vue'

export default {
  name: 'manajemen-cluster',

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
      },
      pagination: {
        page: 1,
        size: 10
      },
      clusters: [],
      totalClusters: 0,
      visibleFilter: false,
      visibleLoadingTable: false,
      icons: {
        delete: Delete,
        edit: Edit
      }
    }
  },

  computed: {
    totalShownClusters () {
      const totalItems = this.totalClusters
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
    this.getClusters()
  },

  methods: {
    ...mapActions(clusterStore, [
      'fetchClusters',
      'deleteCluster'
    ]),

    async getClusters () {
      this.visibleLoadingTable = true
      try {
        const { data } = await this.fetchClusters(this.generateFilters)
        this.clusters = JSON.parse(JSON.stringify(data.data))
        this.totalClusters = data.pagination.total_items
      } catch (error) {
        this.showErrorResponse(error)
      } finally {
        this.visibleLoadingTable = false
      }
    },

    handlePageChange (page) {
      this.pagination.page = page
      this.getClusters()
    },

    handleFilterChange () {
      this.setRouteParam('ManajemenCluster', { ...this.query, ...this.filters })
      this.handlePageChange(1)
    },

    toggleFilter () {
      this.visibleFilter = !this.visibleFilter
    },

    async openModalConfirmation (id) {
      try {
        await this.$confirm(
          'Apakah anda yakin ingin menghapus cluster ini? Tindakan yang sudah dilakukan tidak dapat diubah. Menghapus cluster berarti menghilangkan progress data dan akses mereka',
          'Hapus Cluster',
          {
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            type: 'warning',
            showClose: true
          }
        )
        await this.handleDeleteCluster(id)
        this.showToast('Cluster berhasil dihapus!')
      } catch (e) {}
    },

    async handleDeleteCluster(id) {
      try {
        await this.deleteCluster(id)
        this.getClusters()
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToCreatePage () {
      this.redirectTo('ManajemenClusterCreate')
    },
    
    goToEditPage (id) {
      this.redirectTo('ManajemenClusterEdit', {
        params: {
          id: id
        }
      })
    }
  }
}
