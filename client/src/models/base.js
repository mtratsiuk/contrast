export default db => {
  class Base {
    constructor (data) {
      this._id = data._id
      this._rev = data._rev
    }

    async save () {
      let response = await db[this._id ? 'put' : 'post'](this)
      this._rev = response._rev
      return response
    }

    async remove () {
      return db.remove(this)
    }
  }

  return Base
}
