import api from '~/utils/api'
import apiUrls from '~/config/api-urls'

export default {
  login (body) {
    return api.postRequest(apiUrls.users.login, body)
  },
  fetchACL () {
    return api.getRequest(apiUrls.users.acl)
  },
  refreshAccessToken () {
    return api.postRequest(apiUrls.users.refreshToken, { refresh: localStorage.getItem('refreshToken') })
  },
  fetchUsers (params) {
    return api.getRequest(apiUrls.users.list, params)
  },
  fetchUser (id) {
    return api.getRequest(apiUrls.users.detail(id))
  },
  fetchMyProfile () {
    return api.getRequest(apiUrls.users.me)
  },
  createUser (body) {
    return api.postRequest(apiUrls.users.create, body)
  },
  editUser (id, body) {
    return api.putRequest(apiUrls.users.detail(id), body)
  },
  deleteUser (id) {
    return api.deleteRequest(apiUrls.users.detail(id))
  },
  fetchRoles (params) {
    return api.getRequest(apiUrls.users.roles, params)
  },
  fetchDivisions (params) {
    return api.getRequest(apiUrls.users.divisions, params)
  },
}
