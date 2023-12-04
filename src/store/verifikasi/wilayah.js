import { defineStore } from 'pinia'
import api from '~/api/verifikasi/wilayah'

export const wilayahStore = defineStore('WilayahStore', {
  actions: {
    async fetchProvinces (params) {
      return api.fetchProvinces(params)
    },
    async fetchCities (params) {
      return api.fetchCities(params)
    }
  }
})
