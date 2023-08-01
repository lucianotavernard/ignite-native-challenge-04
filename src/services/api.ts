import axios from 'axios'

export const baseUrl = 'https://api.shieldlab.com.br'

export const api = axios.create({
  baseURL: 'https://api.shieldlab.com.br'
})

api.interceptors.request.use(
  (config) => new Promise((resolve) => setTimeout(() => resolve(config), 800))
)
