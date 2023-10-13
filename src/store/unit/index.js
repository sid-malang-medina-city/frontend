import { defineStore } from 'pinia'
import api from '~/api/unit'

export const unitStore = defineStore('UnitStore', {
  actions: {
    async fetchUnits (params) {
      return api.fetchUnits(params)
    },
    async fetchUnit (id) {
      return api.fetchUnit(id)
    },
    async deleteUnit (id) {
      return api.deleteUnit(id)
    },
    async createUnit (body) {
      return api.createUnit(body)
    },
    async editUnit (id, body) {
      return api.editUnit(id, body)
    },
    async fetchClusters (params) {
      return api.fetchClusters(params)
    },
    async fetchCluster (id) {
      return api.fetchCluster(id)
    },
    async deleteCluster (id) {
      return api.deleteCluster(id)
    },
    async createCluster (body) {
      return api.createCluster(body)
    },
    async editCluster (id, body) {
      return api.editCluster(id, body)
    },
    async fetchTipeUnits (params) {
      return api.fetchTipeUnits(params)
    },
    async fetchTipeUnit (id) {
      return api.fetchTipeUnit(id)
    },
    async deleteTipeUnit (id) {
      return api.deleteTipeUnit(id)
    },
    async createTipeUnit (body) {
      return api.createTipeUnit(body)
    },
    async editTipeUnit (id, body) {
      return api.editTipeUnit(id, body)
    },
    async fetchFasilitass (params) {
      return api.fetchFasilitass(params)
    },
    async fetchFasilitas (id) {
      return api.fetchFasilitas(id)
    },
    async deleteFasilitas (id) {
      return api.deleteFasilitas(id)
    },
    async createFasilitas (body) {
      return api.createFasilitas(body)
    },
    async editFasilitas (id, body) {
      return api.editFasilitas(id, body)
    },
  }
})
