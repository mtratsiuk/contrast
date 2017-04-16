export default class EventEmitter {
  constructor () {
    this._listeners = Object.create(null)
  }

  on (eventName, listener) {
    if (!this._listeners[eventName]) {
      this._listeners[eventName] = []
    }
    this._listeners[eventName].push(listener)
  }

  off (eventName, listener) {
    if (!this._listeners[eventName]) return
    let index = this._listeners[eventName].indexOf(listener)
    if (index !== -1) this._listeners[eventName].splice(index, 1)
  }

  _emit (eventName, data) {
    if (!this._listeners[eventName]) return
    this._listeners[eventName].forEach(listener => listener(data))
  }
}
