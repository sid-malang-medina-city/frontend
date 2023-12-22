import api from '~/utils/api'
import apiUrls from '~/config/api-urls'

export default {
  fetchDashboard () {
    return api.getRequest(apiUrls.dashboard.info)
  },
  fetchRingkasanPenjualan (params) {
    return api.getRequest(apiUrls.dashboard.ringkasanPenjualan, params)
  },
  fetchRingkasanPembangunan (params) {
    return api.getRequest(apiUrls.dashboard.ringkasanPembangunan, params)
  },
  fetchDemografi (params) {
    return api.getRequest(apiUrls.dashboard.demografi, params)
  }
}
