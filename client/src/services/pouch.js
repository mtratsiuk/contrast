import PouchDB from 'pouchdb'

import user from 'services/user'
import logger from 'shared/logger'

class Pouch {
  constructor () {
    this._resolveDb = null
    this._rejectDb = null
    this._dbSync = null
    this._dbPromise = null

    if (user.isLoggedIn()) {
      this._init(user.getData())
    }

    user.on('login', data => this._init(data))
    user.on('logout', () => this._destroy())
  }

  async getDb () {
    return this._dbPromise
  }

  async _init (userData) {
    let localDbName = userData.name
    let remoteDbName = `${window.location.origin}/api/sync/${userData.db}`

    this._dbPromise = new Promise((resolve, reject) => {
      this._rejectDb = reject
      this._resolveDb = resolve
    })

    let db = new PouchDB(localDbName)

    try {
      await db.replicate.from(remoteDbName)
      this._resolveDb(db)
    } catch (error) {
      logger.error(error)
      this._rejectDb(error)
    }

    this._dbSync = db.sync(remoteDbName, {
      live: true,
      retry: true
    })
      .on('error', error => {
        logger.error(error)
      })
  }

  async _destroy () {
    let db = await this._dbPromise
    this._dbSync.cancel()
    this._dbPromise = null
    return db.destroy()
  }
}

export default new Pouch()
