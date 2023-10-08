import api from '~/utils/api'
import apiUrls from '~/config/api-urls'

export default {
  fetchUnits (params) {
    return api.getRequest(apiUrls.unit.list, params)
  },
  fetchUnit (id) {
    console.log(id)
    return api.getRequest(apiUrls.unit.detail(id))
  },
  deleteUnit (body) {
    return api.deleteRequest(apiUrls.unit.list, body)
  },
  createUnit (body) {
    return api.postRequest(apiUrls.unit.list, body)
  },
  editUnit (id, body) {
    console.log('msk')
    return api.putRequest(apiUrls.unit.detail(id), body)
  }
}
