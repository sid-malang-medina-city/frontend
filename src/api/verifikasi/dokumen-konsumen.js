import api from '~/utils/api'
import apiUrls from '~/config/api-urls'

export default {
  fetchDokumenKonsumens (params) {
    return api.getRequest(apiUrls.verifikasi.dokumenKonsumen.list, params)
  },
  fetchDokumenKonsumen (id) {
    return api.getRequest(apiUrls.verifikasi.dokumenKonsumen.detail(id))
  },
  editDokumenKonsumen (id, body) {
    return api.putRequest(apiUrls.verifikasi.dokumenKonsumen.detail(id), body)
  },
  triggerNotifications () {
    return api.postRequest(apiUrls.verifikasi.dokumenKonsumen.triggerNotifications)
  },
}
