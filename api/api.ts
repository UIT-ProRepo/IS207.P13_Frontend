import useSessionStore from '@/stores/useSessionStore'
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const accessToken = useSessionStore.getState().accessToken

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

api.interceptors.response.use(
  (response) => {
    response.data = camelcaseKeys(response.data, { deep: true })

    return response
  },
  (error) => {
    // TODO: Handle redirect to login page if 401 and redirect to home page if 403
    return Promise.reject(error)
  },
)

export default api
