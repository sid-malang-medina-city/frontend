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
    this.setMenuItemsWithAccess()
  },

  methods: {
    ...mapActions(navigationStore, ['toggleNavigationBar']),

    setMenuItemsWithAccess () {
      const acls = localStorage.getItem('acls')
      // this.menuItemsCode = accessModule && accessModule.actions

      if (!acls.length) { // If has no actions access, set nav menu to empty
        this.menuItems = []
        this.adminMenuItems = []
        return
      }
      
      let navItemsCopy = JSON.parse(JSON.stringify(NAVIGATION_ITEMS))
      this.menuItems = navItemsCopy.filter(item => {
        if (acls.includes(item.menuCode)) return true

        if (item.children && item.children.length) {
          item.children = this.hasChildItemAccess(item.children)
          return !!item.children.length // return true if any child has access or else return false
        }
        return false
      })
      
      let adminNavItemsCopy = JSON.parse(JSON.stringify(ADMIN_NAVIGATION_ITEMS))
      this.adminMenuItems = adminNavItemsCopy.filter(item => {
        if (acls.includes(item.menuCode)) return true

        if (item.children && item.children.length) {
          item.children = this.hasChildItemAccess(item.children)
          return !!item.children.length // return true if any child has access or else return false
        }
        return false
      })
    },

    hasChildItemAccess (children) {
      const acls = localStorage.getItem('acls')
      return children.filter(child => {
        return acls.includes(child.menuCode)
      })
    },

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
      localStorage.removeItem('acls')
      localStorage.removeItem('role')
      localStorage.removeItem('division')
      this.redirectTo('Login')
    }
  }
}
