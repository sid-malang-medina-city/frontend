import emptyBox from '/empty-box.svg'

import RouterHandler from '~/mixins/router-handler'

export default {
  name: 'no-access',

  mixins: [RouterHandler],

  data () {
    return {
      emptyBox
    }
  },

  computed: {
    errorType () {
      return this.$route.path === '/no-access' ? 'no-access' : 'not-found'
    }
  },

  methods: {
    goToDashboard () {
      this.redirectTo('Dashboard')
    }
  }
}
