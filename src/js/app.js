import AppHeader from '~/components/AppHeader.vue'
import AppNavigation from '~/components/AppNavigation.vue'

export default {
  name: 'app',

  components: {
    AppHeader,
    AppNavigation,
  },

  data () {
    return {
      innerHeight: window.innerHeight,
      // TODO: need to move isCollapse to store
      isCollapse: false,
      visibleRouterView: true
    }
  },

  computed: {
    routeIsNotLogin () {
      return this.$route.name !== 'Login'
    }
  },

  methods: {
    toggleNavigation (isCollapse) {
      this.isCollapse = isCollapse
    }
  }
}
