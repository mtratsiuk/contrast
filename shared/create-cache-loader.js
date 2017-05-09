const http = require('./http')
const logger = require('./logger')

const storage = Object.create(null)
const memoryStorage = {
  get: key => storage[key],
  set: (key, value) => { storage[key] = value }
}

module.exports = (url, expirationTime, { get, set } = memoryStorage) => {
  let dataKey = `cache-loader-data-${url}`
  let dataTimestampKey = `cache-loader-timestamp-${url}`

  return async () => {
    let data = get(dataKey)
    let dataTimestamp = get(dataTimestampKey)

    if (data &&
      dataTimestamp &&
      Date.now() - dataTimestamp < expirationTime) {
      return data
    }

    try {
      set(dataKey, (await http.get(url)).data)
      set(dataTimestampKey, Date.now())
      return get(dataKey)
    } catch (error) {
      if (data) {
        logger.warning(`data API is not available: ${error.message}`)
        return data
      } else {
        throw error
      }
    }
  }
}
