import { defineStore } from 'pinia'
import api from '~/api/marketing/marketer'

export const marketerStore = defineStore('MarketerStore', {
  actions: {
    async fetchMarketers (params) {
      return api.fetchMarketers(params)
    },
    async fetchMarketer (id) {
      return api.fetchMarketer(id)
    },
    async deleteMarketer (id) {
      return api.deleteMarketer(id)
    },
    async createMarketer (body) {
      return api.createMarketer(body)
    },
    async editMarketer (id, body) {
      return api.editMarketer(id, body)
    }
  }
})
