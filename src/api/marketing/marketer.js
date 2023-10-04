import api from '~/utils/api'
import apiUrls from '~/config/api-urls'

export default {
  fetchMarketers (params) {
    return api.getRequest(apiUrls.marketer.list, params)
  },
}
