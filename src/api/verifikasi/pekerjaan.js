import api from '~/utils/api'
import apiUrls from '~/config/api-urls'

export default {
  fetchPekerjaans (params) {
    return api.getRequest(apiUrls.verifikasi.pekerjaan.list, params)
  },
  fetchPekerjaan (id) {
    return api.getRequest(apiUrls.verifikasi.pekerjaan.detail(id))
  },
  deletePekerjaan (id) {
    return api.deleteRequest(apiUrls.verifikasi.pekerjaan.detail(id))
  },
  createPekerjaan (body) {
    return api.postRequest(apiUrls.verifikasi.pekerjaan.list, body)
  },
  editPekerjaan (id, body) {
    return api.putRequest(apiUrls.verifikasi.pekerjaan.detail(id), body)
  }
}
