import { defineStore } from 'pinia'
import api from '~/api/verifikasi/dokumen-konsumen'

export const dokumenKonsumenStore = defineStore('DokumenKonsumenStore', {
  actions: {
    async fetchDokumenKonsumens (params) {
      return api.fetchDokumenKonsumens(params)
    },
    async fetchDokumenKonsumen (id) {
      return api.fetchDokumenKonsumen(id)
    },
    async editDokumenKonsumen (id, body) {
      return api.editDokumenKonsumen(id, body)
    }
  }
})
