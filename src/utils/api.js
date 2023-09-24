import axios from 'axios'

const BASE_URL = 'https://sid-mmc-backend.onrender.com'

export default {
  getRequest (path, params) {
    return axios.get(BASE_URL + path, { params, withCredentials: false })
  },
  postRequest (path, data, configs) {
    return axios.post(BASE_URL + path, data, configs)
  },
  putRequest (path, data, params) {
    return axios.put(BASE_URL + path, data, { params })
  },
  deleteRequest (path, data) {
    return axios.delete(BASE_URL + path, { data })
  }
}
