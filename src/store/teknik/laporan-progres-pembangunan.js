import { defineStore } from 'pinia'
import api from '~/api/teknik/laporan-progres-pembangunan'

export const laporanProgresPembangunanStore = defineStore('LaporanProgresPembangunanStore', {
  actions: {
    async fetchLaporanProgresPembangunans (params) {
      return api.fetchLaporanProgresPembangunans(params)
    },
    async fetchLaporanProgresPembangunan (id) {
      return api.fetchLaporanProgresPembangunan(id)
    },
    async deleteLaporanProgresPembangunan (id) {
      return api.deleteLaporanProgresPembangunan(id)
    },
    async createLaporanProgresPembangunan (body) {
      return api.createLaporanProgresPembangunan(body)
    },
    async editLaporanProgresPembangunan (id, body) {
      return api.editLaporanProgresPembangunan(id, body)
    },
    async generatePDF (body) {
      return api.generatePDF(body)
    },
  }
})
