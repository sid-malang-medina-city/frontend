import api from '~/utils/api'
import apiUrls from '~/config/api-urls'

export default {
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
  }
}
