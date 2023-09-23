import RouterHandler from '~/mixins/router-handler'
import logo from '/logo.svg'

export default {
  name: 'login',

  mixins: [RouterHandler],

  data () {
    return {
      formData: {
        email: '',
        password: ''
      },
      logo
    }
  },

  computed: {
    isSubmitButtonDisabled () {
      return !this.formData.email || !this.formData.password
    }
  },

  methods: {
    login () {
      this.redirectTo('Dashboard')
    }
  }
}
