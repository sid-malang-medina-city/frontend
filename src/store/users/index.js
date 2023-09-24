import { defineStore } from 'pinia'
import api from '~/api/users'

export const userStore = defineStore('UserStore', {
  actions: {
    async login (body) {
      return api.login(body)
    }
  }
})
