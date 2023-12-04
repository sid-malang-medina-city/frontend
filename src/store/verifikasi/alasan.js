import { defineStore } from 'pinia'
import api from '~/api/verifikasi/alasan'

export const alasanStore = defineStore('AlasanStore', {
  actions: {
    async fetchAlasans (params) {
      return api.fetchAlasans(params)
    },
    async fetchAlasan (id) {
      return api.fetchAlasan(id)
    },
    async deleteAlasan (id) {
      return api.deleteAlasan(id)
    },
    async createAlasan (body) {
      return api.createAlasan(body)
    },
    async editAlasan (id, body) {
      return api.editAlasan(id, body)
    }
  }
})
