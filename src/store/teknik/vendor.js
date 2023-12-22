import { defineStore } from 'pinia'
import api from '~/api/teknik/vendor'

export const vendorStore = defineStore('VendorStore', {
  actions: {
    async fetchVendors (params) {
      return api.fetchVendors(params)
    },
    async fetchVendor (id) {
      return api.fetchVendor(id)
    },
    async deleteVendor (id) {
      return api.deleteVendor(id)
    },
    async createVendor (body) {
      return api.createVendor(body)
    },
    async editVendor (id, body) {
      return api.editVendor(id, body)
    }
  }
})
