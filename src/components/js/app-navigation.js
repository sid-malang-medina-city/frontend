import RouterHandler from '~/mixins/router-handler'
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
      isCollapse: false,
      logoutIcon: SwitchButton,
      sidIcon,
      dashboardIcon
    }
  },

  created () {
    this.menuItems = NAVIGATION_ITEMS
    this.adminMenuItems = ADMIN_NAVIGATION_ITEMS
  },

  methods: {
    getChildren (menu) {
      return this.menuItems[menu].children
    },

    toggleNavigation () {
      this.isCollapse = !this.isCollapse
      this.$emit('toggle', this.isCollapse)
    },

    logout () {
      this.redirectTo('Login')
    }
  }
}
