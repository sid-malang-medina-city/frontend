import api from '~/utils/api'
import apiUrls from '~/config/api-urls'

export default {
  login (body) {
    return api.postRequest(apiUrls.users.login, body)
  },
  fetchUsers (params) {
    return api.getRequest(apiUrls.users.list, params)
  },
  createUser (body) {
    return api.postRequest(apiUrls.users.list, body)
  },
  editUser (id, body) {
    return api.putRequest(apiUrls.users.edit(id), body)
  }
}
