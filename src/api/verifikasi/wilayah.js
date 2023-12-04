import api from '~/utils/api'
import apiUrls from '~/config/api-urls'

export default {
  fetchProvinces (params) {
    return api.getRequest(apiUrls.verifikasi.wilayah.province, params)
  },
  fetchCities (params) {
    return api.getRequest(apiUrls.verifikasi.wilayah.city, params)
  }
}
