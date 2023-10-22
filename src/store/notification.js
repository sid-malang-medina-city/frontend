import { defineStore } from 'pinia'
import api from '~/api/notification'

export const notificationStore = defineStore('NotificationStore', {
  state: () => {
    return {
      notifications: []
    }
  },
  actions: {
    async fetchNotifications (params) {
      const response = await api.fetchNotifications(params)
      const { data } = response
      this.notifications = JSON.parse(JSON.stringify(data))
      return response
    },
    async readNotification (id, body) {
      return api.readNotification(id, body)
    },
    async readAllNotifications () {
      return api.readAllNotifications()
    }
  }
})
