import base from 'models/base'

export default db => {
  class Transaction extends base(db) {
    constructor (data) {
      super(data)
      this.doctype = data.doctype || 'transaction'
      this.value = +data.value
      this.type = data.type
      this.currency = data.currency
      this.name = data.name
      this.category = data.category
      this.tags = (data.tags || []).filter(x => !!x)
      this.timestamp = data.timestamp || Date.now()
    }

    static async getAll () {
      return (await db.allDocs({
        include_docs: true
      })).rows.map(({ doc }) => new Transaction(doc))
    }

    static async getFieldsSuggestions () {
      let suggestions = (await db.allDocs({
        include_docs: true
      })).rows.reduce((result, { doc }) => {
        _.forEach(tag => result.tags.add(tag), doc.tags)
        result.names.add(doc.name)
        if (doc.category) result.categories.add(doc.category)
        return result
      }, {
        tags: new Set(),
        names: new Set(),
        categories: new Set()
      })

      return _.mapValues(x => Array.from(x), suggestions)
    }
  }

  return Transaction
}
