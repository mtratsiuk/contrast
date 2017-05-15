import base from 'models/base'
import * as currencyService from 'services/currency'

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

    getFormattedDate () {
      return (new Date(this.timestamp)).toLocaleString()
    }

    getFormattedValue () {
      return currencyService.format(this.value, this.currency)
    }

    get isExpense () {
      return !this.type || this.type === 'expense'
    }

    get isIncome () {
      return this.type === 'income'
    }

    static async getAll () {
      return (await db.allDocs({
        include_docs: true
      })).rows.map(({ doc }) => new Transaction(doc))
    }

    static async getFieldsSuggestions (docs) {
      let suggestions = (docs || (await Transaction.getAll())).reduce((result, doc) => {
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

    static async bulkUpdate (docs) {
      return db.bulkDocs(docs)
    }
  }

  return Transaction
}
