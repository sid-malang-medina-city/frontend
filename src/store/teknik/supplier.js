import { defineStore } from 'pinia'
import api from '~/api/teknik/supplier'

export const supplierStore = defineStore('SupplierStore', {
  actions: {
    async fetchSuppliers (params) {
      return api.fetchSuppliers(params)
    },
    async fetchSupplier (id) {
      return api.fetchSupplier(id)
    },
    async deleteSupplier (id) {
      return api.deleteSupplier(id)
    },
    async createSupplier (body) {
      return api.createSupplier(body)
    },
    async editSupplier (id, body) {
      return api.editSupplier(id, body)
    }
  }
})
