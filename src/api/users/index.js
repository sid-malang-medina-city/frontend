import api from '~/utils/api'
import apiUrls from '~/config/api-urls'

export default {
  login (body) {
    return api.postRequest(apiUrls.users.login, body, { withCredentials: false })
  }
}
