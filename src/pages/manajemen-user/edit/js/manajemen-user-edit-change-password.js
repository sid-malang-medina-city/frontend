import { mapActions } from 'pinia'
import { userStore } from '~/store/users'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'

import {
  WarningFilled,
  CircleCheckFilled,
  CircleCloseFilled
} from '@element-plus/icons-vue'

export default {
  name: 'manajemen-user-edit-change-password',

  mixins: [RouterHandler, ToastHandler],

  components: {
    PageHeader,
    WarningFilled,
    CircleCheckFilled,
    CircleCloseFilled
  },

  data () {
    return {
      formData: {
        password: ''
      },
      confirmPassword: '',
      error: {
        password: ''
      },
      visibleLoading: false
    }
  },

  computed: {
    isPasswordSame () {
      return !!this.formData.password && !!this.confirmPassword && this.formData.password === this.confirmPassword
    },

    id () {
      return this.$route.params.id
    }
  },

  created () {
    this.getUser()
  },

  methods: {
    ...mapActions(userStore, [
      'fetchUser',
      'editUser'
    ]),

    async getUser () {
      try {
        const { data } = await this.fetchUser(this.id)
        this.id = data.id
      } catch (e) {
        this.showErrorResponse(e)
      }
    },

    validatePassword () {
      if (!!+this.formData.password || this.formData.password.length < 8) {
        this.error.password = 'Password tidak boleh semua numerik dan minimal 8 karakter'
        return false
      }
      
      this.error.password = ''
      return true
    },

    async submit () {
      if (this.validatePassword()) {
        this.visibleLoading = true
        try {
          await this.editUser(this.id, this.formData)
          this.showToast('Kata sandi berhasil diperbaharui!')
          this.goToManajemenUserEdit()
        } catch (e) {
          this.showErrorResponse(e)
        } finally {
          this.visibleLoading = false
        }
      }
    },

    goToManajemenUserEdit () {
      this.redirectTo('ManajemenUserEdit', {
        params: {
          id: this.id
        }
      })
    }
  }
}
