import api from '~/utils/api'
import apiUrls from '~/config/api-urls'

export default {
  fetchMarketers (params) {
    return api.getRequest(apiUrls.marketing.marketer.list, params)
  },
  fetchMarketer (id) {
    return api.getRequest(apiUrls.marketing.marketer.detail(id))
  },
  deleteMarketer (id) {
    return api.deleteRequest(apiUrls.marketing.marketer.detail(id))
  },
  createMarketer (body) {
    return api.postRequest(apiUrls.marketing.marketer.list, body)
  },
}
