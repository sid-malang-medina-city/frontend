import { mapState } from 'pinia'
import AppHeader from '~/components/AppHeader.vue'
import AppNavigation from '~/components/AppNavigation.vue'
import { navigationStore } from '~/store/navigation'

export default {
  name: 'app',

  components: {
    AppHeader,
    AppNavigation,
  },

  created () {
    console.log('env', process.env.NODE_ENV)
  },

  data () {
    return {
      innerHeight: window.innerHeight,
      visibleRouterView: true,
      routeIsNotLogin: false
    }
  },

  computed: {
    ...mapState(navigationStore, ['isCollapse'])
  },

  watch: {
    '$route.name' () {
      this.routeIsNotLogin = this.$route.name !== 'Login'
    }
  }
}
