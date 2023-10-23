import { mapActions } from 'pinia'
import { userStore } from '~/store/users'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'
import AclHandler from '~/mixins/acl-handler'
import DebounceHandler from '~/mixins/debounce-handler'

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
  name: 'manajemen-user',

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
      users: [],
      totalUsers: 0,
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
    totalShownUsers () {
      const totalItems = this.totalUsers
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
    this.getUsers()
    this.getRoles()
    this.getDivisions()
  },

  methods: {
    ...mapActions(userStore, [
      'fetchUsers',
      'fetchRoles',
      'fetchDivisions',
      'deleteUser'
    ]),

    async getUsers () {
      this.visibleLoadingTable = true
      try {
        const { data } = await this.fetchUsers(this.generateFilters)
        this.users = JSON.parse(JSON.stringify(data.data))
        this.totalUsers = data.pagination.total_items
      } catch (error) {
        this.showErrorResponse(error)
      } finally {
        this.visibleLoadingTable = false
      }
    },

    async getRoles () {
      try {
        const { data } = await this.fetchRoles()
        this.roles = JSON.parse(JSON.stringify(data))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },
    
    async getDivisions () {
      try {
        const { data } = await this.fetchDivisions()
        this.divisions = JSON.parse(JSON.stringify(data))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    handlePageChange (page) {
      this.pagination.page = page
      this.getUsers()
    },

    handleFilterChange () {
      if (this.filters.division === '') {
        this.filters.division = null
      }
      
      if (this.filters.role === '') {
        this.filters.role = null
      }

      this.setRouteParam('ManajemenUser', { ...this.query, ...this.filters })
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

    goToCreatePage () {
      this.redirectTo('ManajemenUserCreate')
    },

    goToEditPage (id) {
      this.redirectTo('ManajemenUserEdit', {
        params: {
          id: id
        }
      })
    },

    goToDetailPage ({ id }) {
      this.redirectTo('ManajemenUserDetail', {
        params: {
          id: id
        }
      })
    },

    async openModalConfirmation (id) {
      try {
        await this.$confirm(
          'Apakah anda yakin ingin menghapus user ini? Tindakan yang sudah dilakukan tidak dapat diubah. Menghapus user berarti menghilangkan progress data dan akses mereka',
          'Hapus User',
          {
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            type: 'warning',
            showClose: true
          }
        )
        await this.handleDeleteUser(id)
        this.showToast('User berhasil dihapus!')
      } catch (e) {}
    },

    async handleDeleteUser(id) {
      try {
        await this.deleteUser(id)
        this.getUsers()
      } catch (error) {
        this.showErrorResponse(error)
      }
    }
  }
}
