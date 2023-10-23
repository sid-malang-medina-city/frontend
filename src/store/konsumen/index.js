import { defineStore } from 'pinia'
import api from '~/api/konsumen'

export const konsumenStore = defineStore('KonsumenStore', {
  actions: {
    async fetchKonsumens (params) {
      return api.fetchKonsumens(params)
    },
    async fetchKonsumen (id) {
      return api.fetchKonsumen(id)
    },
    async deleteKonsumen (body) {
      return api.deleteKonsumen(body)
    },
    async createKonsumen (body) {
      return api.createKonsumen(body)
    },
    async editKonsumen (id, body) {
      return api.editKonsumen(id, body)
    }
  }
})
