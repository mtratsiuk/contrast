module.exports = ({ createCacheLoader }) => {
  const RATES_URL = 'https://openexchangerates.org/api/latest.json'
  const RATES_API_KEY = process.env.OPEN_EXCHANGE_RATES_API_KEY
  const URL = `${RATES_URL}?app_id=${RATES_API_KEY}`

  const RATES_EXPIRATION_TIME = 3 * 60 * 60 * 1000

  const get = createCacheLoader(URL, RATES_EXPIRATION_TIME)

  return {
    get
  }
}
