module.exports = ({ logger }) => (error, req, res, next) => {
  logger.error(`${error.message}:\n${JSON.stringify(error.data, null, 2)}\n${error.stack}`)

  res.status(error.status || 500).json(error.data)
}
