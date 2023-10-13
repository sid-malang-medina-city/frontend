import api from '~/utils/api'
import apiUrls from '~/config/api-urls'

export default {
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
  }
}
