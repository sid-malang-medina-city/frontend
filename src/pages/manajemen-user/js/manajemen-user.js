import { mapActions } from 'pinia'
import { userStore } from '~/store/users'

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

export default {
  name: 'manajemen-user',

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
        username: this.$route.query.username || null,
        divisi: this.$route.query.divisi || null,
        role: this.$route.query.role || null,
      },
      pagination: {
        page: 1,
        size: 10
      },
      divisis: [],
      roles: [],
      users: [],
      totalUsers: 0,
      visibleFilter: false,
      visibleLoadingTable: false,
      icons: {
        delete: Delete,
        edit: Edit
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

    isAnyFilterFilled () {
      return !!this.filters.username || !!this.filters.divisi || !!this.filters.role
    }
  },

  created () {
    this.getUsers()
  },

  methods: {
    ...mapActions(userStore, ['fetchUsers']),

    async getUsers () {
      this.visibleLoadingTable = true
      try {
        const { data } = await this.fetchUsers(this.filters)
        this.users = JSON.parse(JSON.stringify(data.data))
        this.totalUsers = data.pagination.totalUsers
      } catch (error) {
        this.showErrorResponse(error)
      } finally {
        this.visibleLoadingTable = false
      }
    },

    handlePageChange (page) {
      this.pagination.page = page
      this.getUsers()
    },

    handleFilterChange () {
      this.setRouteParam('ManajemenUser', { ...this.query, ...this.filters })
      this.getUsers()
    },

    toggleFilter () {
      this.visibleFilter = !this.visibleFilter
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
    }
  }
}
