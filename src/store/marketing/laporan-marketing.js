import { defineStore } from 'pinia'
import api from '~/api/marketing/laporan-marketing'

export const laporanMarketingStore = defineStore('LaporanMarketingStore', {
  actions: {
    async fetchLaporanMarketings (params) {
      return api.fetchLaporanMarketings(params)
    },
    async fetchLaporanMarketing (id) {
      return api.fetchLaporanMarketing(id)
    },
    async deleteLaporanMarketing (id) {
      return api.deleteLaporanMarketing(id)
    },
    async editLaporanMarketing (id, body) {
      return api.editLaporanMarketing(id, body)
    }
  }
})
