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

export default storage
