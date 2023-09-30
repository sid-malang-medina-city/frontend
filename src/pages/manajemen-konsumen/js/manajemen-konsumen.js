import { mapActions } from 'pinia'
import { konsumenStore } from '~/store/konsumen'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'

import {
  ArrowDown,
  ArrowUp,
  Plus,
  Search,
  Edit,
  Delete
} from '@element-plus/icons-vue'

const STATUS_KONSUMEN = {
  BOOKING: {
    name: 'Booking',
    code: 'BOOKING',
    color: '#1DC4F9'
  },
  TERJADWAL_VERIFIKASI: {
    name: 'Terjadwal verifikasi',
    code: 'TERJADWAL_VERFIKASI',
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

export default {
  name: 'manajemen-konsumen',

  mixins: [RouterHandler, ToastHandler],

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
        edit: Edit
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
    }
  },

  created () {
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
        const { data } = await this.fetchKonsumens(this.filters)
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
      this.setRouteParam('ManajemenKonsumen', { ...this.query, ...this.filters })
      this.getKonsumens()
    },

    toggleFilter () {
      this.visibleFilter = !this.visibleFilter
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
    }
  }
}
