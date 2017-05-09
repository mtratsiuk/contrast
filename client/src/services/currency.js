import createCacheLoader from 'shared/create-cache-loader'
import storage from 'utils/storage'

export const getRates = createCacheLoader('/api/rates', 3 * 60 * 60 * 1000, storage)

export const getCurrencyCodes = async () => {
  let data = await getRates()
  return _.keys(data.rates)
}
