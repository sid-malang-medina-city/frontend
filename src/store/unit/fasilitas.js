import { defineStore } from 'pinia'
import api from '~/api/unit/fasilitas'

export const fasilitasStore = defineStore('FasilitasStore', {
  actions: {
    async fetchFasilitass (params) {
      return api.fetchFasilitass(params)
    },
    async fetchFasilitas (id) {
      return api.fetchFasilitas(id)
    },
    async deleteFasilitas (id) {
      return api.deleteFasilitas(id)
    },
    async createFasilitas (body) {
      return api.createFasilitas(body)
    },
    async editFasilitas (id, body) {
      return api.editFasilitas(id, body)
    }
  }
})
