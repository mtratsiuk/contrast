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

export const get = key => {
  try {
    return JSON.parse(storage.getItem(key))
  } catch (error) {
    return null
  }
}

export const set = (key, value) => {
  storage.setItem(key, JSON.stringify(value))
}

export const remove = key => storage.removeItem(key)

export const clear = () => storage.clear()
