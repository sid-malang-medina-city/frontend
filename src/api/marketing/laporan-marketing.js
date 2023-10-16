import api from '~/utils/api'
import apiUrls from '~/config/api-urls'

export default {
  fetchLaporanMarketings (params) {
    return api.getRequest(apiUrls.marketing.laporanMarketing.list, params)
  },
  fetchLaporanMarketing (id) {
    return api.getRequest(apiUrls.marketing.laporanMarketing.detail(id))
  },
  deleteLaporanMarketing (id) {
    return api.deleteRequest(apiUrls.marketing.laporanMarketing.detail(id))
  },
  editLaporanMarketing (id, body) {
    return api.putRequest(apiUrls.marketing.laporanMarketing.detail(id), body)
  },
}
