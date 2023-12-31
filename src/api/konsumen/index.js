import api from '~/utils/api'
import apiUrls from '~/config/api-urls'

export default {
  fetchKonsumens (params) {
    return api.getRequest(apiUrls.konsumen.list, params)
  },
  fetchKonsumen (id) {
    return api.getRequest(apiUrls.konsumen.detail(id))
  },
  deleteKonsumen (id) {
    return api.deleteRequest(apiUrls.konsumen.detail(id))
  },
  createKonsumen (body) {
    return api.postRequest(apiUrls.konsumen.list, body)
  },
  editKonsumen (id, body) {
    return api.putRequest(apiUrls.konsumen.detail(id), body)
  },
}
