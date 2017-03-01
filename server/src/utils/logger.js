const log = (level, message) => {
  let timestamp = (new Date()).toUTCString()

  ;(console[level] || console.log)(`\n[${timestamp}]\n${message}\n`)
}

const info = message => log('info', message)

const warning = message => log('warning', message)

const error = message => log('error', message)

module.exports = {
  info,
  warning,
  error
}
