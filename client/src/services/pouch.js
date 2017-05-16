import PouchDB from 'pouchdb'
import pouchDBFind from 'pouchdb-find'
PouchDB.plugin(pouchDBFind)

import store from 'store'
import { logout } from 'actions/user'
import { loadTransactions } from 'actions/transactions'
import user from 'services/user'
import logger from 'shared/logger'

const BATCH_SIZE = 1000

class Pouch {
  constructor () {
    this._db = null
    this._dbSync = null
    this._dbChanges = null

    if (user.isLoggedIn()) {
      this._init(user.getData())
    }

    user.on('login', data => this._init(data))
    user.on('logout', () => this._destroy())
  }

  getDb () {
    return this._db
  }

  async _init (userData) {
    let localDbName = userData.name
    let remoteDbName = `${window.location.origin}/api/sync/${userData.db}`

    this._db = new PouchDB(localDbName)

    try {
      await this._db.sync(remoteDbName, {
        batch_size: BATCH_SIZE
      })
    } finally {
      this._dbSync = this._db.sync(remoteDbName, {
        live: true,
        retry: true,
        batch_size: BATCH_SIZE
      }).on('error', error => {
        logger.error(error)
        if (error.status === 401) {
          store.dispatch(logout())
        }
      })

      this._dbChanges = this._db.changes({
        since: 'now',
        live: true,
        include_docs: false
      }).on('change', () => {
        store.dispatch(loadTransactions())
      }).on('error', error => {
        logger.error(error)
      })
    }
  }

  _destroy () {
    this._dbSync.cancel()
    this._dbChanges.cancel()
    this._db.destroy()
    this._db = null
  }
}

if (__DEV__) {
  window.PouchDB = PouchDB
}

export default new Pouch()
