import { defineStore } from 'pinia'
import api from '~/api/teknik/spk-non-unit'

export const SPKNonUnitStore = defineStore('SPKNonUnitStore', {
  actions: {
    async fetchSPKNonUnits (params) {
      return api.fetchSPKNonUnits(params)
    },
    async fetchSPKNonUnit (id) {
      return api.fetchSPKNonUnit(id)
    },
    async deleteSPKNonUnit (id) {
      return api.deleteSPKNonUnit(id)
    },
    async createSPKNonUnit (body) {
      return api.createSPKNonUnit(body)
    },
    async editSPKNonUnit (id, body) {
      return api.editSPKNonUnit(id, body)
    },
    async generatePDF (body) {
      return api.generatePDF(body)
    }
  }
})
