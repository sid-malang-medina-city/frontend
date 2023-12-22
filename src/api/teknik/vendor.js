import api from '~/utils/api'
import apiUrls from '~/config/api-urls'

export default {
  fetchVendors (params) {
    return api.getRequest(apiUrls.teknik.vendor.list, params)
  },
  fetchVendor (id) {
    return api.getRequest(apiUrls.teknik.vendor.detail(id))
  },
  deleteVendor (id) {
    return api.deleteRequest(apiUrls.teknik.vendor.detail(id))
  },
  createVendor (body) {
    return api.postRequest(apiUrls.teknik.vendor.list, body)
  },
  editVendor (id, body) {
    return api.putRequest(apiUrls.teknik.vendor.detail(id), body)
  },
}
