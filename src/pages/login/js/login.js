import { mapActions } from 'pinia'
import { userStore } from '~/store/users'
import RouterHandler from '~/mixins/router-handler'
import ToastHandler from '~/mixins/toast-handler'
import logo from '/logo.svg'

export default {
  name: 'login',

  mixins: [RouterHandler, ToastHandler],

  data () {
    return {
      formData: {
        email: '',
        password: ''
      },
      visibleLoading: false,
      logo
    }
  },

  computed: {
    isSubmitButtonDisabled () {
      return !this.formData.email || !this.formData.password
    }
  },

  methods: {
    ...mapActions(userStore, ['login']),

    async submit () {
      this.visibleLoading = true
      try {
        const { data } = await this.login(this.formData)
        localStorage.setItem('accessToken', data.access)
        localStorage.setItem('refreshToken', data.refresh)
        this.redirectTo('Dashboard')
      } catch (error) {
        this.showErrorResponse(error)
      } finally {
        this.visibleLoading = false
      }
    }
  }
}
