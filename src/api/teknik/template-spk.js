import api from '~/utils/api'
import apiUrls from '~/config/api-urls'

export default {
  fetchTemplateSPKs (params) {
    return api.getRequest(apiUrls.teknik.templateSPK.list, params)
  },
  fetchTemplateSPK (id) {
    return api.getRequest(apiUrls.teknik.templateSPK.detail(id))
  },
  deleteTemplateSPK (id) {
    return api.deleteRequest(apiUrls.teknik.templateSPK.detail(id))
  },
  createTemplateSPK (body) {
    return api.postRequest(apiUrls.teknik.templateSPK.list, body)
  },
  editTemplateSPK (id, body) {
    return api.putRequest(apiUrls.teknik.templateSPK.detail(id), body)
  },
}
