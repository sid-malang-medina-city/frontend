import { defineStore } from 'pinia'
import api from '~/api/marketing/laporan-invoice'

export const laporanInvoiceStore = defineStore('LaporanInvoiceStore', {
  actions: {
    async fetchLaporanInvoices (params) {
      return api.fetchLaporanInvoices(params)
    },
    async generatePDF (id) {
      return api.generatePDF(id)
    }
  }
})
