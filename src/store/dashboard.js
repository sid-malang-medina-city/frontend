import { defineStore } from 'pinia'
import api from '~/api/dashboard'

export const dashboardStore = defineStore('DashboardStore', {
  actions: {
    async fetchDashboard () {
      return api.fetchDashboard()
    },
    async fetchRingkasanPenjualan () {
      return api.fetchRingkasanPenjualan()
    },
    async fetchRingkasanPembangunan () {
      return api.fetchRingkasanPembangunan()
    },
    async fetchDemografi (params) {
      return api.fetchDemografi(params)
    }
  }
})
