import { defineStore } from 'pinia'
import api from '~/api/users'

export const userStore = defineStore('UserStore', {
  actions: {
    async login (body) {
      return api.login(body)
    },
    async fetchACL () {
      return api.fetchACL()
    },
    async fetchUsers (params) {
      return api.fetchUsers(params)
    },
    async fetchUser (id) {
      return api.fetchUser(id)
    },
    async createUser (body) {
      return api.createUser(body)
    },
    async editUser (id, body) {
      return api.editUser(id, body)
    },
    async deleteUser (body) {
      return api.deleteUser(body)
    },
    async fetchRoles (params) {
      return api.fetchRoles(params)
    },
    async fetchDivisions (params) {
      return api.fetchDivisions(params)
    }
  }
})
