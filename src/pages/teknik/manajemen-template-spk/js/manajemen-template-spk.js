import { mapActions } from 'pinia'
import { templateSPKStore } from '~/store/teknik/template-spk'
import { tipeUnitStore } from '~/store/unit/tipe-unit'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'
import AclHandler from '~/mixins/acl-handler'
import DebounceHandler from '~/mixins/debounce-handler'

import helpers from '~/utils/helpers'
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
  name: 'manajemen-template-spk',

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
        tipe_unit: this.$route.query.tipe_unit || null
      },
      pagination: {
        page: 1,
        size: 10
      },
      tipeUnits: [],
      templateSPKs: [],
      totalTemplateSPKs: 0,
      visibleFilter: false,
      visibleLoadingTable: false,
      icons: {
        delete: Delete,
        edit: Edit,
        arrowCounterClockwise: arrowCounterClockwiseIcon
      },
      helpers
    }
  },

  computed: {
    totalShownTemplateSPKs () {
      const totalItems = this.totalTemplateSPKs
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
    this.getTemplateSPKs()
    this.getTipeUnits()
  },

  methods: {
    ...mapActions(templateSPKStore, [
      'fetchTemplateSPKs',
      'deleteTemplateSPK'
    ]),
    ...mapActions(tipeUnitStore, ['fetchTipeUnits']),
    
    async getTemplateSPKs () {
      this.visibleLoadingTable = true
      try {
        const { data } = await this.fetchTemplateSPKs(this.generateFilters)
        this.templateSPKs = JSON.parse(JSON.stringify(data.data))
        this.totalTemplateSPKs = data.pagination.total_items
      } catch (error) {
        this.showErrorResponse(error)
      } finally {
        this.visibleLoadingTable = false
      }
    },

    async getTipeUnits () {
      try {
        const { data } = await this.fetchTipeUnits({
          skip_pagination: true
        })
        this.tipeUnits = JSON.parse(JSON.stringify(data))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    handlePageChange (page) {
      this.pagination.page = page
      this.getTemplateSPKs()
    },

    handleFilterChange () {
      if (this.filters.status === '') {
        this.filters.status = null
      }

      this.setRouteParam('ManajemenTemplateSPK', { ...this.query, ...this.filters })
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
          'Apakah anda yakin ingin menghapus template SPK ini? Tindakan yang sudah dilakukan tidak dapat diubah. Menghapus template SPK berarti menghilangkan progress data',
          'Hapus Template SPK',
          {
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            type: 'warning',
            showClose: true
          }
        )
        await this.handleDeleteTemplateSPK(id)
        this.showToast('Template SPK berhasil dihapus!')
      } catch (e) {}
    },

    async handleDeleteTemplateSPK(id) {
      try {
        await this.deleteTemplateSPK(id)
        this.getTemplateSPKs()
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToCreatePage () {
      this.redirectTo('ManajemenTemplateSPKCreate')
    },

    goToDetailPage ({ id }) {
      this.redirectTo('ManajemenTemplateSPKDetail', {
        params: {
          id: id
        }
      })
    },

    goToEditPage (id) {
      this.redirectTo('ManajemenTemplateSPKEdit', {
        params: {
          id: id
        }
      })
    }
  }
}
