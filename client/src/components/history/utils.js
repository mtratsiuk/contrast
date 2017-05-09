export const filter = (transactions, query) => {
  return _.filter(getFilter(query), transactions)
}

const isNotEmpty = _.negate(_.isEmpty)

const createTextFieldFilter = (fieldName, termsObj) => transaction => {
  let terms = termsObj[fieldName]
  let field = transaction[fieldName]

  if (terms.length === 1 && !terms[0].length) return true
  if (!field) return false

  field = Array.isArray(field) ? _.map(_.toLower, field) : field.toLowerCase()
  terms = _.pipe(_.filter(isNotEmpty), _.map(_.toLower))(terms)

  return Array.isArray(field)
    ? _.some(f => _.some(term => f.indexOf(term) !== -1, terms), field)
    : _.some(term => field.indexOf(term) !== -1, terms)
}

const getFilter = query => {
  let terms = _.mapValues(v => v.split(','), query)
  let typeTerm = terms.type && terms.type[0]
  let startTime = terms.startDate && (new Date(terms.startDate)).getTime()
  let endTime = terms.endDate && (new Date(terms.endDate)).getTime()

  let filters = [
    createTextFieldFilter('name', terms),
    createTextFieldFilter('category', terms),
    createTextFieldFilter('tags', terms),
    ({ type }) => !typeTerm || type === typeTerm,
    ({ timestamp }) => !startTime || timestamp >= startTime,
    ({ timestamp }) => !endTime || timestamp <= endTime
  ]

  return _.allPass(filters)
}
