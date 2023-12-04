import api from '~/utils/api'
import apiUrls from '~/config/api-urls'

export default {
  fetchAlasans (params) {
    return api.getRequest(apiUrls.verifikasi.alasan.list, params)
  },
  fetchAlasan (id) {
    return api.getRequest(apiUrls.verifikasi.alasan.detail(id))
  },
  deleteAlasan (id) {
    return api.deleteRequest(apiUrls.verifikasi.alasan.detail(id))
  },
  createAlasan (body) {
    return api.postRequest(apiUrls.verifikasi.alasan.list, body)
  },
  editAlasan (id, body) {
    return api.putRequest(apiUrls.verifikasi.alasan.detail(id), body)
  }
}
