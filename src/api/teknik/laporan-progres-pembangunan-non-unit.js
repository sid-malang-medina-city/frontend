import api from '~/utils/api'
import apiUrls from '~/config/api-urls'

export default {
  fetchLaporanProgresPembangunanNonUnits (params) {
    return api.getRequest(apiUrls.teknik.laporanProgresPembangunanNonUnit.list, params)
  },
  fetchLaporanProgresPembangunanNonUnit (id) {
    return api.getRequest(apiUrls.teknik.laporanProgresPembangunanNonUnit.detail(id))
  },
  deleteLaporanProgresPembangunanNonUnit (id) {
    return api.deleteRequest(apiUrls.teknik.laporanProgresPembangunanNonUnit.detail(id))
  },
  createLaporanProgresPembangunanNonUnit (body) {
    return api.postRequest(apiUrls.teknik.laporanProgresPembangunanNonUnit.list, body)
  },
  editLaporanProgresPembangunanNonUnit (id, body) {
    return api.putRequest(apiUrls.teknik.laporanProgresPembangunanNonUnit.detail(id), body)
  },
  generatePDF (body) {
    return api.postRequest(apiUrls.teknik.laporanProgresPembangunanNonUnit.generatePDF, body)
  },
}
