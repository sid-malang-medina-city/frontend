import api from '~/utils/api'
import apiUrls from '~/config/api-urls'

export default {
  fetchLaporanProgresPOs (params) {
    return api.getRequest(apiUrls.teknik.laporanProgresPO.list, params)
  },
  fetchLaporanProgresPO (id) {
    return api.getRequest(apiUrls.teknik.laporanProgresPO.detail(id))
  },
  deleteLaporanProgresPO (id) {
    return api.deleteRequest(apiUrls.teknik.laporanProgresPO.detail(id))
  },
  createLaporanProgresPO (body) {
    return api.postRequest(apiUrls.teknik.laporanProgresPO.list, body)
  },
  editLaporanProgresPO (id, body) {
    return api.putRequest(apiUrls.teknik.laporanProgresPO.detail(id), body)
  },
  generatePDF (body) {
    return api.postRequest(apiUrls.teknik.laporanProgresPO.generateLaporanProgresPO, body)
  }
}
