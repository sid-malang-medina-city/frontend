import api from '~/utils/api'
import apiUrls from '~/config/api-urls'

export default {
  fetchUnits (params) {
    return api.getRequest(apiUrls.unit.list, params)
  },
  deleteUnit (body) {
    return api.deleteRequest(apiUrls.unit.list, body)
  }
}
