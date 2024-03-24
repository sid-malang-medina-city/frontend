import { defineStore } from 'pinia'
import api from '~/api/teknik/po-supplier'

export const POSupplierStore = defineStore('POSupplierStore', {
  actions: {
    async fetchPOSuppliers (params) {
      return api.fetchPOSuppliers(params)
    },
    async fetchPOSupplier (id) {
      return api.fetchPOSupplier(id)
    },
    async deletePOSupplier (id) {
      return api.deletePOSupplier(id)
    },
    async createPOSupplier (body) {
      return api.createPOSupplier(body)
    },
    async editPOSupplier (id, body) {
      return api.editPOSupplier(id, body)
    },
    async generatePDF (body) {
      return api.generatePDF(body)
    }
  }
})
