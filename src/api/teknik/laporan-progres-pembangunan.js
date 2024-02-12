import api from '~/utils/api'
import apiUrls from '~/config/api-urls'

export default {
  fetchLaporanProgresPembangunans (params) {
    return api.getRequest(apiUrls.teknik.laporanProgresPembangunan.list, params)
  },
  fetchLaporanProgresPembangunan (id) {
    return api.getRequest(apiUrls.teknik.laporanProgresPembangunan.detail(id))
  },
  deleteLaporanProgresPembangunan (id) {
    return api.deleteRequest(apiUrls.teknik.laporanProgresPembangunan.detail(id))
  },
  createLaporanProgresPembangunan (body) {
    return api.postRequest(apiUrls.teknik.laporanProgresPembangunan.list, body)
  },
  editLaporanProgresPembangunan (id, body) {
    return api.putRequest(apiUrls.teknik.laporanProgresPembangunan.detail(id), body)
  },
  generatePDF (body) {
    return api.postRequest(apiUrls.teknik.laporanProgresPembangunan.generatePDF, body)
  },
}
