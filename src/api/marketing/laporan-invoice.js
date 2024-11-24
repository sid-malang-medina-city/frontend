import api from '~/utils/api'
import apiUrls from '~/config/api-urls'

export default {
  fetchLaporanInvoices (params) {
    return api.getRequest(apiUrls.marketing.laporanInvoice.list, params)
  },
  generatePDF (body) {
    return api.postRequest(apiUrls.marketing.laporanInvoice.generatePDF, body)
  },
}
