import http from 'shared/http'

const BASE_URL = '/api'

export const signup = (name, password) => http.post(`${BASE_URL}/signup`, { name, password })

export const login = (name, password) => http.post(`${BASE_URL}/login`, { name, password })

export const logout = () => http.post(`${BASE_URL}/logout`)
