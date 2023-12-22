import { defineStore } from 'pinia'
import api from '~/api/teknik/template-spk'

export const templateSPKStore = defineStore('TemplateSPKStore', {
  actions: {
    async fetchTemplateSPKs (params) {
      return api.fetchTemplateSPKs(params)
    },
    async fetchTemplateSPK (id) {
      return api.fetchTemplateSPK(id)
    },
    async deleteTemplateSPK (id) {
      return api.deleteTemplateSPK(id)
    },
    async createTemplateSPK (body) {
      return api.createTemplateSPK(body)
    },
    async editTemplateSPK (id, body) {
      return api.editTemplateSPK(id, body)
    }
  }
})
