import axios from 'axios'

const locationApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_LOCATION_API_URL,
})

export default locationApi
