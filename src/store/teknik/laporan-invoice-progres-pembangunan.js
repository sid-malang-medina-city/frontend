import { defineStore } from 'pinia'
import api from '~/api/teknik/laporan-invoice-progres-pembangunan'

export const laporanInvoiceProgresPembangunanStore = defineStore('LaporanInvoiceProgresPembangunanStore', {
  actions: {
    async fetchLaporanInvoiceProgresPembangunans (params) {
      return api.fetchLaporanInvoiceProgresPembangunans(params)
    }
  }
})
