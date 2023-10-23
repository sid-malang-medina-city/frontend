import { mapActions } from 'pinia'
import { userStore } from '~/store/users'

import PageHeader from '~/components/general/page-header/PageHeader.vue'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'

import {
  WarningFilled,
  CircleCheckFilled
} from '@element-plus/icons-vue'

export default {
  name: 'change-password',

  mixins: [RouterHandler, ToastHandler],

  components: {
    PageHeader,
    WarningFilled,
    CircleCheckFilled
  },

  data () {
    return {
      id: '',
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
  },

  created () {
    this.getMyProfile()
  },

  methods: {
    ...mapActions(userStore, [
      'fetchMyProfile',
      'editUser'
    ]),

    async getMyProfile () {
      try {
        const { data } = await this.fetchMyProfile()
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
          this.redirectTo('UserProfile')
          this.showToast('Kata sandi berhasil diperbaharui!')
        } catch (e) {
          this.showErrorResponse(e)
        } finally {
          this.visibleLoading = false
        }
      }
    },

    goToUserProfile () {
      this.redirectTo('UserProfile')
    }
  }
}
