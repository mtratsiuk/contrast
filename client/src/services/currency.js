import fx from 'money'

import createCacheLoader from 'shared/create-cache-loader'
import storage from 'utils/storage'
import userService from 'services/user'

const { locale } = (new Intl.NumberFormat()).resolvedOptions()

export const getRates = createCacheLoader('/api/rates', 3 * 60 * 60 * 1000, storage)

export const getCurrencyCodes = async () => {
  let data = await getRates()
  return _.keys(data.rates)
}

export const calculateBalance = async transactions => {
  let { base, rates } = await getRates()
  let to = userService.getPreferredCurrency()
  fx.base = base
  fx.rates = rates
  return transactions.reduce((res, cur) => {
    let value = fx.convert(cur.value, { from: cur.currency, to })
    if (cur.isExpense) value = -value
    return res + value
  }, 0)
}

export const format = (value, currency = userService.getPreferredCurrency()) => {
  return (new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  })).format(value)
}
