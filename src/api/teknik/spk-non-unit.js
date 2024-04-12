import api from '~/utils/api'
import apiUrls from '~/config/api-urls'

export default {
  fetchSPKNonUnits (params) {
    return api.getRequest(apiUrls.teknik.SPKNonUnit.list, params)
  },
  fetchSPKNonUnit (id) {
    return api.getRequest(apiUrls.teknik.SPKNonUnit.detail(id))
  },
  deleteSPKNonUnit (id) {
    return api.deleteRequest(apiUrls.teknik.SPKNonUnit.detail(id))
  },
  createSPKNonUnit (body) {
    return api.postRequest(apiUrls.teknik.SPKNonUnit.list, body)
  },
  editSPKNonUnit (id, body) {
    return api.putRequest(apiUrls.teknik.SPKNonUnit.detail(id), body)
  },
  generatePDF (body) {
    return api.postRequest(apiUrls.teknik.SPKNonUnit.generateSPKNonUnit, body)
  }
}
