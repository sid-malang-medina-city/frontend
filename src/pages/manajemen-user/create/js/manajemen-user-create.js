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
  name: 'manajemen-user-create',

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
        email: '',
        password: '',
        confirmPassword: '',
      },
      error: {
        email: '',
        password: ''
      },
      // TODO need to update divisis and roles, this is temporary for mock usage
      divisis: ['Marketing', 'Verifikasi', 'Teknik'],
      roles: ['Staff', 'Admin', 'Manager']
    }
  },

  computed: {
    isPasswordSame () {
      return !!this.formData.password && !!this.formData.confirmPassword && this.formData.password === this.formData.confirmPassword
    },

    isAllRequiredFieldsFilled () {
      const requiredFields = Object.keys(this.formData)
      return requiredFields.every(field => !!this.formData[field])
    },

    isSubmitButtonDisabled () {
      return this.isAllRequiredFieldsFilled && this.isPasswordSame
    }
  },

  methods: {
    ...mapActions(userStore, ['createUser']),

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

    validatePassword () {
      if (!!+this.formData.password || this.formData.password.length < 8) {
        this.error.password = 'Password tidak boleh semua numerik dan minimal 8 karakter'
        return false
      }
      
      this.error.password = ''
      return true
    },

    async submit () {
      if (this.validateEmail() && this.validatePassword()) {
        this.visibleLoading = true
        try {
          await this.createUser(this.formData)
          this.redirectTo('ManajemenUser')
          this.showToast('User baru berhasil ditambahkan!')
        } catch (e) {
          this.showErrorResponse(e)
        } finally {
          this.visibleLoading = false
        }
      }
    }
  }
}