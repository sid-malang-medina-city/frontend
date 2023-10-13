import api from '~/utils/api'
import apiUrls from '~/config/api-urls'

export default {
  fetchUnits (params) {
    return api.getRequest(apiUrls.unit.list, params)
  },
  fetchUnit (id) {
    return api.getRequest(apiUrls.unit.detail(id))
  },
  deleteUnit (id) {
    return api.deleteRequest(apiUrls.unit.detail(id))
  },
  createUnit (body) {
    return api.postRequest(apiUrls.unit.list, body)
  },
  editUnit (id, body) {
    return api.putRequest(apiUrls.unit.detail(id), body)
  },
  fetchClusters (params) {
    return api.getRequest(apiUrls.unit.cluster.list, params)
  },
  fetchCluster (id) {
    return api.getRequest(apiUrls.unit.cluster.detail(id))
  },
  deleteCluster (id) {
    return api.deleteRequest(apiUrls.unit.cluster.detail(id))
  },
  createCluster (body) {
    return api.postRequest(apiUrls.unit.cluster.list, body)
  },
  editCluster (id, body) {
    return api.putRequest(apiUrls.unit.cluster.detail(id), body)
  },
  fetchTipeUnits (params) {
    return api.getRequest(apiUrls.unit.tipe.list, params)
  },
  fetchTipeUnit (id) {
    return api.getRequest(apiUrls.unit.tipe.detail(id))
  },
  deleteTipeUnit (id) {
    return api.deleteRequest(apiUrls.unit.tipe.detail(id))
  },
  createTipeUnit (body) {
    return api.postRequest(apiUrls.unit.tipe.list, body)
  },
  editTipeUnit (id, body) {
    return api.putRequest(apiUrls.unit.tipe.detail(id), body)
  },
  fetchFasilitass (params) {
    return api.getRequest(apiUrls.unit.fasilitas.list, params)
  },
  fetchFasilitas (id) {
    console.log('api')
    return api.getRequest(apiUrls.unit.fasilitas.detail(id))
  },
  deleteFasilitas (id) {
    return api.deleteRequest(apiUrls.unit.fasilitas.detail(id))
  },
  createFasilitas (body) {
    return api.postRequest(apiUrls.unit.fasilitas.list, body)
  },
  editFasilitas (id, body) {
    return api.putRequest(apiUrls.unit.fasilitas.detail(id), body)
  }
}
