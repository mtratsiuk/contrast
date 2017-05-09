import EventEmitter from 'utils/event-emitter'
import { get, set, remove } from 'utils/storage'
import http from 'shared/http'
import store from 'store'

const BASE_URL = '/api'
const USER_KEY = 'user'

class UserService extends EventEmitter {
  _login (data) {
    set(USER_KEY, data)
    this._emit('login', data)
    return store.dispatch({
      type: 'USER.LOGIN',
      payload: data
    })
  }

  async signup (name, password) {
    let { data } = await http.post(`${BASE_URL}/signup`, { name, password })
    return this._login(data)
  }

  async login (name, password) {
    let { data } = await http.post(`${BASE_URL}/login`, { name, password })
    return this._login(data)
  }

  async logout () {
    try {
      await http.post(`${BASE_URL}/logout`)
    } finally {
      remove(USER_KEY)
      this._emit('logout')
      store.dispatch({ type: 'USER.LOGOUT' })
    }
  }

  isLoggedIn () {
    return get(USER_KEY) != null
  }

  getData () {
    return get(USER_KEY)
  }
}

export default new UserService()
