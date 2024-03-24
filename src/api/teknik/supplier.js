import api from '~/utils/api'
import apiUrls from '~/config/api-urls'

export default {
  fetchSuppliers (params) {
    return api.getRequest(apiUrls.teknik.supplier.list, params)
  },
  fetchSupplier (id) {
    return api.getRequest(apiUrls.teknik.supplier.detail(id))
  },
  deleteSupplier (id) {
    return api.deleteRequest(apiUrls.teknik.supplier.detail(id))
  },
  createSupplier (body) {
    return api.postRequest(apiUrls.teknik.supplier.list, body)
  },
  editSupplier (id, body) {
    return api.putRequest(apiUrls.teknik.supplier.detail(id), body)
  },
}
