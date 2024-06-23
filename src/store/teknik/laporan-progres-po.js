import { defineStore } from 'pinia'
import api from '~/api/teknik/laporan-progres-po'

export const laporanProgresPOStore = defineStore('laporanProgresPOStore', {
  actions: {
    async fetchLaporanProgresPOs (params) {
      return api.fetchLaporanProgresPOs(params)
    },
    async fetchLaporanProgresPO (id) {
      return api.fetchLaporanProgresPO(id)
    },
    async deleteLaporanProgresPO (id) {
      return api.deleteLaporanProgresPO(id)
    },
    async createLaporanProgresPO (body) {
      return api.createLaporanProgresPO(body)
    },
    async editLaporanProgresPO (id, body) {
      return api.editLaporanProgresPO(id, body)
    },
    async generatePDF (body) {
      return api.generatePDF(body)
    }
  }
})
