import { mapActions } from 'pinia'
import { userStore } from '~/store/users'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'
import AclHandler from '~/mixins/acl-handler'
import DebounceHandler from '~/mixins/debounce-handler'

import arrowCounterClockwiseIcon from '/arrow-counter-clockwise.svg'

import { STATUS_USER } from '~/data/user'

import {
  ArrowDown,
  ArrowUp,
  Plus,
  Search,
  Edit,
  Delete,
  SwitchButton
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
        is_active: this.$route.query.is_active || 'true'
      },
      pagination: {
        page: parseInt(this.$route.query.page) || 1,
        size: 10
      },
      divisions: [],
      roles: [],
      users: [],
      totalUsers: 0,
      userStatuses: STATUS_USER,
      visibleFilter: false,
      visibleLoadingTable: false,
      icons: {
        delete: Delete,
        edit: Edit,
        activate: SwitchButton,
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
      'editUser'
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
      this.setRouteParam('ManajemenUser', { ...this.query, ...this.filters, ...this.pagination })
      this.getUsers()
    },

    handleFilterChange () {
      if (this.filters.division === '') {
        this.filters.division = null
      }
      
      if (this.filters.role === '') {
        this.filters.role = null
      }

      this.handlePageChange(1)
    },

    toggleFilter () {
      this.visibleFilter = !this.visibleFilter
    },

    clearFilters () {
      Object.keys(this.filters).forEach(filter => {
        if (filter !== 'is_active') {
          this.filters[filter] = null
        }
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
          'Apakah anda yakin ingin menonaktifkan user ini? Menonaktifkan user berarti menghilangkan akses mereka sampai diaktifkan kembali',
          'Nonaktifkan User',
          {
            confirmButtonText: 'Nonaktifkan User',
            cancelButtonText: 'Batal',
            type: 'warning',
            showClose: true
          }
        )
        await this.handleDeactivateUser(id)
        this.showToast('User berhasil dinonaktifkan!')
      } catch (e) {}
    },

    async handleDeactivateUser(id) {
      try {
        await this.editUser(id, {
          is_active: 'false'
        })
        this.getUsers()
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    async handleActivateUser(id) {
      try {
        await this.editUser(id, {
          is_active: 'true'
        })
        this.showToast('User berhasil diaktifkan!')
        this.getUsers()
      } catch (error) {
        this.showErrorResponse(error)
      }
    }
  }
}
