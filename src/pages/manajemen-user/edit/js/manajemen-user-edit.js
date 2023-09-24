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
        divisi: '',
        role: '',
        email: ''
      },
      error: {
        email: ''
      },
      // TODO need to update divisis and roles, this is temporary for mock usage
      divisis: ['Marketing', 'Verifikasi', 'Teknik'],
      roles: ['Staff', 'Admin', 'Manager']
    }
  },

  created () {
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
      'fetchUsers',
      'editUser'
    ]),

    async initData () {
      try {
        const { data } = await this.fetchUsers({ id: this.id })
        this.formData = JSON.parse(JSON.stringify(data.data))[0]
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