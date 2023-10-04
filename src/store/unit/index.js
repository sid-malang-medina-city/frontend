import { defineStore } from 'pinia'
import api from '~/api/unit'

export const unitStore = defineStore('UnitStore', {
  actions: {
    async fetchUnits (params) {
      return api.fetchUnits(params)
    },
    async deleteUnit (body) {
      return api.deleteUnit(body)
    },
    async createUnit (body) {
      return api.createUnit(body)
    }
  }
})
