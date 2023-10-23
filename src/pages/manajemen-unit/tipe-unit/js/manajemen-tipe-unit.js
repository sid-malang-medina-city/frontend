import { mapActions } from 'pinia'
import { tipeUnitStore } from '~/store/unit/tipe-unit'

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
  name: 'manajemen-tipe-unit',

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
        page: 1,
        size: 10
      },
      tipeUnits: [],
      totalTipeUnits: 0,
      visibleFilter: false,
      visibleLoadingTable: false,
      icons: {
        delete: Delete,
        edit: Edit
      }
    }
  },

  computed: {
    totalShownTipeUnits () {
      const totalItems = this.totalTipeUnits
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
    this.getTipeUnits()
  },

  methods: {
    ...mapActions(tipeUnitStore, [
      'fetchTipeUnits',
      'deleteTipeUnit'
    ]),

    async getTipeUnits () {
      this.visibleLoadingTable = true
      try {
        const { data } = await this.fetchTipeUnits(this.generateFilters)
        this.tipeUnits = JSON.parse(JSON.stringify(data.data))
        this.totalTipeUnits = data.pagination.total_items
      } catch (error) {
        this.showErrorResponse(error)
      } finally {
        this.visibleLoadingTable = false
      }
    },

    handlePageChange (page) {
      this.pagination.page = page
      this.getTipeUnits()
    },

    handleFilterChange () {
      this.setRouteParam('ManajemenTipeUnit', { ...this.query, ...this.filters })
      this.handlePageChange(1)
    },

    toggleFilter () {
      this.visibleFilter = !this.visibleFilter
    },

    async openModalConfirmation (id) {
      try {
        await this.$confirm(
          'Apakah anda yakin ingin menghapus tipe unit ini? Tindakan yang sudah dilakukan tidak dapat diubah.',
          'Hapus Tipe Unit',
          {
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            type: 'warning',
            showClose: true
          }
        )
        await this.handleDeleteTipeUnit(id)
        this.showToast('Tipe unit berhasil dihapus!')
      } catch (e) {}
    },

    async handleDeleteTipeUnit(id) {
      try {
        await this.deleteTipeUnit(id)
        this.getTipeUnits()
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToCreatePage () {
      this.redirectTo('ManajemenTipeUnitCreate')
    },
    
    goToEditPage (id) {
      this.redirectTo('ManajemenTipeUnitEdit', {
        params: {
          id: id
        }
      })
    }
  }
}
