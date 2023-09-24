import { defineStore } from 'pinia'
import api from '~/api/users'

export const userStore = defineStore('UserStore', {
  actions: {
    async login (body) {
      return api.login(body)
    },
    async fetchUsers (params) {
      return api.fetchUsers(params)
    },
    async createUser (body) {
      return api.createUser(body)
    },
    async editUser (id, body) {
      return api.editUser(id, body)
    },
    async deleteUser (body) {
      return api.deleteUser(body)
    }
  }
})
