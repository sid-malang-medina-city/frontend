import { mapActions } from 'pinia'
import { userStore } from '~/store/users'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

import {
  CircleCheckFilled,
  WarningFilled
} from '@element-plus/icons-vue'

export default {
  name: 'manajemen-user-edit',

  mixins: [RouterHandler, ToastHandler],

  components: {
    CircleCheckFilled,
    WarningFilled,
    PageHeader
  },

  data () {
    return {
      formData: {
        name: '',
        division: '',
        role: '',
        email: ''
      },
      error: {
        email: ''
      },
      divisions: [],
      roles: []
    }
  },

  created () {
    this.getRoles()
    this.getDivisions()
    this.initData()
  },

  computed: {
    id () {
      return this.$route.params.id
    },

    isAllRequiredFieldsFilled () {
      const requiredFields = Object.keys(this.formData)
      return requiredFields.every(field => !!this.formData[field])
    }
  },

  methods: {
    ...mapActions(userStore, [
      'fetchUser',
      'editUser',
      'fetchDivisions',
      'fetchRoles',
    ]),

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

    async initData () {
      try {
        const { data } = await this.fetchUser(this.id)
        this.formData = JSON.parse(JSON.stringify(data))
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToManajemenUser () {
      this.redirectTo('ManajemenUser')
    },

    validateEmail () {
      if (!EMAIL_REGEX.test(String(this.formData.email).toLowerCase())) {
        this.error.email = 'Gunakan format yang sesuai (contoh: user@gmail.com)'
        return false
      }

      this.error.email = ''
      return true
    },

    async submit () {
      if (this.validateEmail()) {
        this.visibleLoading = true
        try {
          await this.editUser(this.id, this.formData)
          this.redirectTo('ManajemenUser')
          this.showToast('Data user berhasil diperbaharui!')
        } catch (e) {
          this.showErrorResponse(e)
        } finally {
          this.visibleLoading = false
        }
      }
    }
  }
}