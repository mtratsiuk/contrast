module.exports = ({ http, logger }) => {
  const RATES_URL = 'https://openexchangerates.org/api/latest.json'
  const RATES_API_KEY = process.env.OPEN_EXCHANGE_RATES_API_KEY
  const URL = `${RATES_URL}?app_id=${RATES_API_KEY}`

  const RATES_EXPIRATION_TIME = 3 * 60 * 60 * 1000

  let rates = null
  let ratesTimestamp = null

  const get = async () => {
    if (rates &&
      ratesTimestamp &&
      Date.now() - ratesTimestamp < RATES_EXPIRATION_TIME) {
      return rates
    }

    try {
      rates = (await http.get(URL)).data
      ratesTimestamp = Date.now()
      return rates
    } catch (error) {
      if (rates) {
        logger.warning(`Rates API is not available: ${error.message}`)
        return rates
      } else {
        throw error
      }
    }
  }

  return {
    get
  }
}
