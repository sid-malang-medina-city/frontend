import { defineStore } from 'pinia'
import api from '~/api/marketing/marketer'

export const marketerStore = defineStore('MarketerStore', {
  actions: {
    async fetchMarketers (params) {
      return api.fetchMarketers(params)
    }
  }
})
