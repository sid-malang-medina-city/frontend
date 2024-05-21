import { defineStore } from 'pinia'
import api from '~/api/teknik/laporan-progres-pembangunan-non-unit'

export const laporanProgresPembangunanNonUnitStore = defineStore('LaporanProgresPembangunanNonUnitStore', {
  actions: {
    async fetchLaporanProgresPembangunanNonUnits (params) {
      return api.fetchLaporanProgresPembangunanNonUnits(params)
    },
    async fetchLaporanProgresPembangunanNonUnit (id) {
      return api.fetchLaporanProgresPembangunanNonUnit(id)
    },
    async deleteLaporanProgresPembangunanNonUnit (id) {
      return api.deleteLaporanProgresPembangunanNonUnit(id)
    },
    async createLaporanProgresPembangunanNonUnit (body) {
      return api.createLaporanProgresPembangunanNonUnit(body)
    },
    async editLaporanProgresPembangunanNonUnit (id, body) {
      return api.editLaporanProgresPembangunanNonUnit(id, body)
    },
    async generatePDF (body) {
      return api.generatePDF(body)
    },
  }
})
