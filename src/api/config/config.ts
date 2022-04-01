import {
  default as AxiosService,
  AxiosRequestConfig,
  AxiosInstance,
} from 'axios'
import { API_URL } from './urls'

export const Axios: AxiosInstance = AxiosService.create()
Axios.defaults.baseURL = API_URL
Axios.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config: AxiosRequestConfig<any>) => {
    const access_token = ''

    if (config.headers) {
      if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`
      }
      config.headers.Accept = 'application/json'
      if (config.headers['Content-Type'] !== 'multipart/form-data') {
        config.headers['Content-Type'] = 'application/json'
      }
    }

    return config
  },
  (error) => Promise.reject(error),
)

Axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
)
