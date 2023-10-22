import api from '~/utils/api'
import apiUrls from '~/config/api-urls'

export default {
  fetchDashboard () {
    return api.getRequest(apiUrls.dashboard.info)
  },
  fetchRingkasanPenjualan () {
    return api.getRequest(apiUrls.dashboard.ringkasanPenjualan)
  },
  fetchRingkasanPembangunan () {
    return api.getRequest(apiUrls.dashboard.ringkasanPembangunan)
  }
}
