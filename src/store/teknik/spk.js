import { defineStore } from 'pinia'
import api from '~/api/teknik/spk'

export const SPKStore = defineStore('SPKStore', {
  actions: {
    async fetchSPKs (params) {
      return api.fetchSPKs(params)
    },
    async fetchSPK (id) {
      return api.fetchSPK(id)
    },
    async deleteSPK (id) {
      return api.deleteSPK(id)
    },
    async createSPK (body) {
      return api.createSPK(body)
    },
    async editSPK (id, body) {
      return api.editSPK(id, body)
    }
  }
})
