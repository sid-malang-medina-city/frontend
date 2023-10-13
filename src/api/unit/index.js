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
  }
}
