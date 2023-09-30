import { defineStore } from 'pinia'
import api from '~/api/konsumen'

export const konsumenStore = defineStore('KonsumenStore', {
  actions: {
    async fetchKonsumens (params) {
      return api.fetchKonsumens(params)
    },
    async deleteKonsumen (body) {
      return api.deleteKonsumen(body)
    }
  }
})
