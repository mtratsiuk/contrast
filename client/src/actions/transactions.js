import { push } from 'react-router-redux'

import { getFormData } from 'utils/forms'
import * as currencyService from 'services/currency'

export const loadTransactions = payload => async (dispatch, { models: { Transaction }, getState }) => {
  let filterQuery = getFilterQuery(getState())

  let transactions = await Transaction.getAll()
  let suggestions = await Transaction.getFieldsSuggestions(transactions)
  let filtered = _filter(transactions, filterQuery)
  let balance = await currencyService.calculateBalance(transactions)
  let filteredBalance = await currencyService.calculateBalance(filtered)

  return dispatch({
    type: 'TRANSACTIONS.DATA_LOADED',
    payload: {
      all: transactions,
      filtered,
      balance,
      filteredBalance,
      autocomplete: suggestions
    }
  })
}

export const loadTransaction = id => async (dispatch, { models: { Transaction } }) => {
  let transaction = await Transaction.getById(id)

  return dispatch({
    type: 'TRANSACTIONS.CURRENT_LOADED',
    payload: transaction
  })
}

export const updateFiltered = () => async (dispatch, { models: { Transaction }, getState }) => {
  let state = getState()
  let filterQuery = getFilterQuery(state)
  let transactions = _.get('transactions.all', state)

  let filtered = _filter(transactions, filterQuery)

  return dispatch({
    type: 'TRANSACTIONS.UPDATE_FILTERED',
    payload: {
      filtered,
      filteredBalance: await currencyService.calculateBalance(filtered)
    }
  })
}

export const createTransaction = (payload, redirect = false) => async (dispatch, { models: { Transaction } }) => {
  let transaction = new Transaction(payload)
  await transaction.save() // TODO: Error handling

  if (redirect) {
    dispatch(push('/history'))
  }
}

export const deleteTransaction = transaction => async (dispatch, { models: { Transaction } }) => {
  await transaction.remove() // TODO: Error handling
  dispatch(push('/history'))
}

export const _filter = (transactions, query) => {
  return _.filter(_getFilter(query), transactions)
}

export const getFilterQuery = _.pipe(_.get('forms.historyFilters'), getFormData)

export const _isNotEmpty = _.negate(_.isEmpty)

export const _createTextFieldFilter = (fieldName, termsObj) => transaction => {
  let terms = termsObj[fieldName]
  let field = transaction[fieldName]

  if (terms && terms.length === 1 && !terms[0].length) return true
  if (!field) return false

  field = Array.isArray(field) ? _.map(_.toLower, field) : field.toLowerCase()
  terms = _.pipe(_.filter(_isNotEmpty), _.map(_.toLower))(terms)

  return Array.isArray(field)
    ? _.some(f => _.some(term => f.indexOf(term) !== -1, terms), field)
    : _.some(term => field.indexOf(term) !== -1, terms)
}

export const _getFilter = query => {
  let terms = _.mapValues(v => v.split(','), query)
  let typeTerm = terms.type && terms.type[0]
  let startTime = terms.startDate && (new Date(terms.startDate)).getTime()
  let endTime = terms.endDate && (new Date(terms.endDate)).getTime()

  let filters = [
    _createTextFieldFilter('name', terms),
    _createTextFieldFilter('category', terms),
    _createTextFieldFilter('tags', terms),
    ({ type }) => !typeTerm || type === typeTerm,
    ({ timestamp }) => !startTime || timestamp >= startTime,
    ({ timestamp }) => !endTime || timestamp <= endTime
  ]

  return _.allPass(filters)
}
