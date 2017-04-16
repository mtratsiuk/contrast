import base from 'models/base'

export default db => {
  class Operation extends base(db) {
    constructor (data) {
      super(data)
      this.doctype = data.doctype || 'operation'
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
      })).rows.map(({ doc }) => new Operation(doc))
    }
  }

  return Operation
}
