import base from 'models/base'

export default db => {
  class Transaction extends base(db) {
    constructor (data) {
      super(data)
      this.doctype = data.doctype || 'transaction'
      this.value = data.value
      this.type = data.type
      this.currency = data.currency
      this.name = data.name
      this.category = data.category
      this.tags = data.tags
      this.timestamp = data.timestamp || Date.now()
    }

    static async getAll () {
      return (await db.allDocs({
        include_docs: true
      })).rows.map(({ doc }) => new Transaction(doc))
    }
  }

  return Transaction
}
