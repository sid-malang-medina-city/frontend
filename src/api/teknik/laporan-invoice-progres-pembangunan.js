import api from '~/utils/api'
import apiUrls from '~/config/api-urls'

export default {
  fetchLaporanInvoiceProgresPembangunans (params) {
    return api.getRequest(apiUrls.teknik.laporanInvoiceProgresPembangunan.list, params)
  }
}
