import api from '~/utils/api'
import apiUrls from '~/config/api-urls'

export default {
  fetchNotifications (params) {
    return api.getRequest(apiUrls.notification.list, params)
  },
  readNotification (id, body) {
    return api.putRequest(apiUrls.notification.detail(id), body)
  },
  readAllNotifications () {
    return api.putRequest(apiUrls.notification.readAll)
  }
}
