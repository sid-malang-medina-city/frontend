import { defineStore } from 'pinia'
import api from '~/api/unit'

export const unitStore = defineStore('UnitStore', {
  actions: {
    async fetchUnits (params) {
      return api.fetchUnits(params)
    },
    async fetchUnit (id) {
      return api.fetchUnit(id)
    },
    async deleteUnit (id) {
      return api.deleteUnit(id)
    },
    async createUnit (body) {
      return api.createUnit(body)
    },
    async editUnit (id, body) {
      return api.editUnit(id, body)
    }
  }
})
