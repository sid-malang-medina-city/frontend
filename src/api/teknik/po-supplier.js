import api from '~/utils/api'
import apiUrls from '~/config/api-urls'

export default {
  fetchPOSuppliers (params) {
    return api.getRequest(apiUrls.teknik.POSupplier.list, params)
  },
  fetchPOSupplier (id) {
    return api.getRequest(apiUrls.teknik.POSupplier.detail(id))
  },
  deletePOSupplier (id) {
    return api.deleteRequest(apiUrls.teknik.POSupplier.detail(id))
  },
  createPOSupplier (body) {
    return api.postRequest(apiUrls.teknik.POSupplier.list, body)
  },
  editPOSupplier (id, body) {
    return api.putRequest(apiUrls.teknik.POSupplier.detail(id), body)
  },
  generatePDF (body) {
    return api.postRequest(apiUrls.teknik.POSupplier.generatePOSupplier, body)
  }
}
