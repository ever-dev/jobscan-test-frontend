import { Axios } from './config'

const methods = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(endpoint: string, params?: any) {
    return new Promise((resolve, reject) => {
      Axios.get(`${endpoint}`, { params })
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => reject(error.response))
    })
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post(endpoint: string, payload: any, type = 'json') {
    return new Promise((resolve, reject) => {
      if (type === 'json') {
        Axios.post(`${endpoint}`, payload)
          .then((response) => {
            resolve(response.data)
          })
          .catch((error) => {
            console.log('api post error: ', error, error.response)
            reject(error.response)
          })
      } else {
        Axios.post(`${endpoint}`, payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then((response) => {
            resolve(response.data)
          })
          .catch((error) => {
            console.log('api post error: ', error, error.response)
            reject(error.response)
          })
      }
    })
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  put(endpoint: string, payload: any) {
    return new Promise((resolve, reject) => {
      Axios.put(`${endpoint}`, payload)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => reject(error.response))
    })
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  patch(endpoint: string, payload: any) {
    return new Promise((resolve, reject) => {
      Axios.patch(`${endpoint}`, payload)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => reject(error.response))
    })
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete(endpoint: string, params?: any) {
    return new Promise((resolve, reject) => {
      Axios.delete(`${endpoint}`, { params })
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => reject(error.response))
    })
  },
}

export default methods
