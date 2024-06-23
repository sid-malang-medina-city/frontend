import { mapActions } from 'pinia'
import { fasilitasStore } from '~/store/unit/fasilitas'

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
  name: 'manajemen-fasilitas',

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
      fasilitass: [],
      totalFasilitass: 0,
      visibleFilter: false,
      visibleLoadingTable: false,
      icons: {
        delete: Delete,
        edit: Edit
      }
    }
  },

  computed: {
    totalShownFasilitass () {
      const totalItems = this.totalFasilitass
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
    this.getFasilitass()
  },

  methods: {
    ...mapActions(fasilitasStore, [
      'fetchFasilitass',
      'deleteFasilitas'
    ]),

    async getFasilitass () {
      this.visibleLoadingTable = true
      try {
        const { data } = await this.fetchFasilitass(this.generateFilters)
        this.fasilitass = JSON.parse(JSON.stringify(data.data))
        this.totalFasilitass = data.pagination.total_items
      } catch (error) {
        this.showErrorResponse(error)
      } finally {
        this.visibleLoadingTable = false
      }
    },

    handlePageChange (page) {
      this.pagination.page = page
      this.setRouteParam('ManajemenFasilitas', { ...this.query, ...this.filters, ...this.pagination })
      this.getFasilitass()
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
          'Apakah anda yakin ingin menghapus fasilitas ini? Tindakan yang sudah dilakukan tidak dapat diubah. Menghapus fasilitas berarti menghilangkan progress data dan akses mereka',
          'Hapus Fasilitas',
          {
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            type: 'warning',
            showClose: true
          }
        )
        await this.handleDeleteFasilitas(id)
        this.showToast('Fasilitas berhasil dihapus!')
      } catch (e) {}
    },

    async handleDeleteFasilitas(id) {
      try {
        await this.deleteFasilitas(id)
        this.getFasilitass()
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToCreatePage () {
      this.redirectTo('ManajemenFasilitasCreate')
    },
    
    goToEditPage (id) {
      this.redirectTo('ManajemenFasilitasEdit', {
        params: {
          id: id
        }
      })
    }
  }
}
