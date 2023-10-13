import { defineStore } from 'pinia'
import api from '~/api/unit/cluster'

export const clusterStore = defineStore('ClusterStore', {
  actions: {
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
    }
  }
})
