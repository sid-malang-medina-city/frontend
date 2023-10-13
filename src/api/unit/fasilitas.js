import api from '~/utils/api'
import apiUrls from '~/config/api-urls'

export default {
  fetchFasilitass (params) {
    return api.getRequest(apiUrls.unit.fasilitas.list, params)
  },
  fetchFasilitas (id) {
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
