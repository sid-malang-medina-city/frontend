import { defineStore } from 'pinia'
import api from '~/api/verifikasi/pekerjaan'

export const pekerjaanStore = defineStore('PekerjaanStore', {
  actions: {
    async fetchPekerjaans (params) {
      return api.fetchPekerjaans(params)
    },
    async fetchPekerjaan (id) {
      return api.fetchPekerjaan(id)
    },
    async deletePekerjaan (id) {
      return api.deletePekerjaan(id)
    },
    async createPekerjaan (body) {
      return api.createPekerjaan(body)
    },
    async editPekerjaan (id, body) {
      return api.editPekerjaan(id, body)
    }
  }
})
