import { defineStore } from 'pinia'
import api from '~/api/dashboard'

export const dashboardStore = defineStore('DashboardStore', {
  actions: {
    async fetchDashboard () {
      return api.fetchDashboard()
    },
    async fetchRingkasanPenjualan (params) {
      return api.fetchRingkasanPenjualan(params)
    },
    async fetchRingkasanPembangunan (params) {
      return api.fetchRingkasanPembangunan(params)
    },
    async fetchDemografi (params) {
      return api.fetchDemografi(params)
    }
  }
})
