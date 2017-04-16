import EventEmitter from 'utils/event-emitter'
import { get, set, remove } from 'utils/storage'

const USER_KEY = 'user'

class UserService extends EventEmitter {
  login (data) {
    set(USER_KEY, data)
    this._emit('login', data)
  }

  logout () {
    remove(USER_KEY)
    this._emit('logout')
  }

  isLoggedIn () {
    return get(USER_KEY) != null
  }

  getData () {
    return get(USER_KEY)
  }
}

export default new UserService()
