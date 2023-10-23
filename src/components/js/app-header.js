import { mapState, mapActions } from 'pinia'
import { notificationStore } from '~/store/notification'
import ToastHandler from '~/mixins/toast-handler'
import RouterHandler from '~/mixins/router-handler'
import helpers from '~/utils/helpers'

import {
  Bell,
  Search,
  User,
  Check
} from '@element-plus/icons-vue'

export default {
  name: 'app-header',

  mixins: [ToastHandler, RouterHandler],

  components: {
    Bell,
    Search,
    User,
    Check
  },

  data () {
    return {
      visibleNotification: false,
      popoverRef: null,
      helpers
    }
  },

  computed: {
    ...mapState(notificationStore, ['notifications']),

    isSomeNotificationHasNotBeenRead () {
      return this.notifications.some(notification => !notification.is_read)
    }
  },

  methods: {
    ...mapActions(notificationStore, [
      'readNotification',
      'readAllNotifications'
    ]),

    async markAsRead (notification) {
      try {
        await this.readNotification(notification.id, { is_read: true })
        document.getElementById('id-header').click()
        this.redirectTo(notification.route_name, {
          params: {
            id: notification.param_id
          }
        })
      } catch (error) {
        this.showErrorResponse(error)
      }
    },
    
    
    async markAllAsRead () {
      try {
        await this.readAllNotifications()
        this.notifications.forEach(notification => {
          notification.is_read = true
        })
      } catch (error) {
        this.showErrorResponse(error)
      }
    },

    goToUserProfile () {
      this.redirectTo('UserProfile')
    }
  }
}
