import api from '~/utils/api'
import apiUrls from '~/config/api-urls'

export default {
  fetchUnits (params) {
    return api.getRequest(apiUrls.unit.list, params)
  },
  deleteUnit (body) {
    return api.deleteRequest(apiUrls.unit.list, body)
  },
  createUnit (body) {
    console.log('msk')
    return api.postRequest(apiUrls.unit.list, body)
  }
}
