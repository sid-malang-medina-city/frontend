import { defineStore } from 'pinia'
import api from '~/api/unit/tipe-unit'

export const tipeUnitStore = defineStore('TipeUnitStore', {
  actions: {
    async fetchTipeUnits (params) {
      return api.fetchTipeUnits(params)
    },
    async fetchTipeUnit (id) {
      return api.fetchTipeUnit(id)
    },
    async deleteTipeUnit (id) {
      return api.deleteTipeUnit(id)
    },
    async createTipeUnit (body) {
      return api.createTipeUnit(body)
    },
    async editTipeUnit (id, body) {
      return api.editTipeUnit(id, body)
    }
  }
})
