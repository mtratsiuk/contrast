const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const logger = require('./utils/logger')
const routes = require('./routes')
const errorHandler = require('./middlewares/error-handling')

const app = express()

app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api', routes)

app.use(errorHandler({ logger }))

app.listen(process.env.CONTRAST_SERVER_PORT, () => {
  logger.info(`Contrast server listens at ${process.env.CONTRAST_SERVER_PORT}`)
})
