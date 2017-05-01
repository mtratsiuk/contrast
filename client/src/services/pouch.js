import PouchDB from 'pouchdb'
import pouchDBFind from 'pouchdb-find'
PouchDB.plugin(pouchDBFind)

import store from 'store'
import { logout } from 'actions/user'
import user from 'services/user'
import logger from 'shared/logger'

class Pouch {
  constructor () {
    this._db = null
    this._dbSync = null

    if (user.isLoggedIn()) {
      this._init(user.getData())
    }

    user.on('login', data => this._init(data))
    user.on('logout', () => this._destroy())
  }

  getDb () {
    return this._db
  }

  _init (userData) {
    let localDbName = userData.name
    let remoteDbName = `${window.location.origin}/api/sync/${userData.db}`

    this._db = new PouchDB(localDbName)

    this._dbSync = this._db.sync(remoteDbName, {
      live: true,
      retry: true
    }).on('error', error => {
      logger.error(error)
      if (error.status === 401) {
        store.dispatch(logout())
      }
    })
  }

  _destroy () {
    this._dbSync.cancel()
    this._db.destroy()
    this._db = null
  }
}

if (__DEV__) {
  window.PouchDB = PouchDB
}

export default new Pouch()
