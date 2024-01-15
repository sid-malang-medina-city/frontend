import router from '~/router'
import api from '~/api/users'
import { axiosApiInstance } from './api'

export const requestInterceptor = async config => {
  const accessToken = localStorage.getItem('accessToken')
  config.headers = { 
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': config.url.includes('spk') ? 'application/json' : 'multipart/form-data'
  }
  return config
}

export const errorRequestHandler = error => {
  return Promise.reject(error)
}

export default async function responseHandler (error) {
  const originalRequest = error.config
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true
    const accessToken = await refreshToken()            
    axiosApiInstance.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
    return axiosApiInstance(originalRequest)    
  }

  if (error.response.status === 401 && originalRequest._retry) {
    router.push({ name: 'Login' })
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }

  if (error.response.status === 403) {
    // TODO: implement forbidden status
  }
  return Promise.reject(error)
}

async function refreshToken () {
  try {
    const { data } = await api.refreshAccessToken()
    localStorage.setItem('accessToken', data.access)
    return data.access
  } catch (e) {
    return null
  }
}
