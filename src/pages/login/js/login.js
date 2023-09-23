import logo from '/logo.svg'

export default {
  name: 'login',

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
  }
}
