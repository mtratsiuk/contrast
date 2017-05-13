let memoryStorage = Object.create(null)

const storage = window.localStorage || {
  getItem (key) {
    return memoryStorage[key]
  },

  setItem (key, value) {
    memoryStorage[key] = value
  },

  removeItem (key) {
    return delete memoryStorage[key]
  },

  clear () {
    memoryStorage = Object.create(null)
  }
}

const _getKey = key => `_contrast_${key}`

export const get = key => {
  try {
    return JSON.parse(storage.getItem(_getKey(key)))
  } catch (error) {
    return null
  }
}

export const set = (key, value) => {
  storage.setItem(_getKey(key), JSON.stringify(value))
}

export const remove = key => storage.removeItem(_getKey(key))

export const clear = () => storage.clear()

export default { get, set, remove, clear }
