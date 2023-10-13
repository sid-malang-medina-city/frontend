import RouterHandler from '~/mixins/router-handler'
import { mapActions, mapState } from 'pinia'
import {
  NAVIGATION_ITEMS,
  ADMIN_NAVIGATION_ITEMS
} from '~/data/navigation.js'
import sidIcon from '/logo.svg'
import dashboardIcon from '/dashboard.svg'
import {
  Menu,
  SwitchButton
} from '@element-plus/icons-vue'
import { navigationStore } from '~/store/navigation'

export default {
  name: 'app-nav',

  emits: ['toggle'],

  mixins: [RouterHandler],

  components: {
    Menu,
    SwitchButton
  },

  data () {
    return {
      menuItems: [],
      adminMenuItems: [],
      menuItemsCode: [],
      logoutIcon: SwitchButton,
      sidIcon,
      dashboardIcon
    }
  },

  computed: {
    ...mapState(navigationStore, ['isCollapse'])
  },

  created () {
    this.menuItems = NAVIGATION_ITEMS
    this.adminMenuItems = ADMIN_NAVIGATION_ITEMS
  },

  methods: {
    ...mapActions(navigationStore, ['toggleNavigationBar']),

    getChildren (menu) {
      return this.menuItems[menu].children
    },
    
    getAdminChildren (menu) {
      return this.adminMenuItems[menu].children
    },

    toggleNavigation () {
      this.toggleNavigationBar()
    },

    logout () {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      this.redirectTo('Login')
    }
  }
}
