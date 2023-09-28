import axios from 'axios'
import apiUrls from '~/config/api-urls'
import {
  requestInterceptor,
  errorRequestHandler
} from './interceptor-handler'
import responseHandler from './interceptor-handler'

export const axiosAuthInstance = axios.create();
export const axiosApiInstance = axios.create();

const BASE_URL = import.meta.env.VITE_BASE_URL
const AUTH_PATHS = [apiUrls.users.login, apiUrls.users.refreshToken]

axiosApiInstance.interceptors.request.use(requestInterceptor, errorRequestHandler)
axiosApiInstance.interceptors.response.use(undefined, responseHandler)

export default {
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),

  getRequest (path, params) {
    return axiosApiInstance.get(BASE_URL + path, { params })
  },
  postRequest (path, data) {
    const axiosInstance = AUTH_PATHS.includes(path) ? axiosAuthInstance : axiosApiInstance
    return axiosInstance.post(BASE_URL + path, data)
  },
  putRequest (path, data, params) {
    return axiosApiInstance.put(BASE_URL + path, data, { params })
  },
  deleteRequest (path, data) {
    return axiosApiInstance.delete(BASE_URL + path, { data })
  }
}
