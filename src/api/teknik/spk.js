import api from '~/utils/api'
import apiUrls from '~/config/api-urls'

export default {
  fetchSPKs (params) {
    return api.getRequest(apiUrls.teknik.SPK.list, params)
  },
  fetchSPK (id) {
    return api.getRequest(apiUrls.teknik.SPK.detail(id))
  },
  deleteSPK (id) {
    return api.deleteRequest(apiUrls.teknik.SPK.detail(id))
  },
  createSPK (body) {
    return api.postRequest(apiUrls.teknik.SPK.list, body)
  },
  editSPK (id, body) {
    return api.putRequest(apiUrls.teknik.SPK.detail(id), body)
  },
  generatePDF (body) {
    return api.postRequest(apiUrls.teknik.SPK.generateSPK, body)
  }
}
