class ContrastError extends Error {
  constructor (message, status, data) {
    super(message)
    this.status = status
    this.data = data
  }

  toString () {
    return `[${this.status || ''}] ${this.message}\n${JSON.stringify(this.data)}`
  }
}

module.exports = {
  ContrastError
}
