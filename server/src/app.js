const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
global.fetch = require('node-fetch')

const logger = require('./shared/logger')
const routes = require('./routes')
const errorHandler = require('./middlewares/error-handling')

const STATIC_PATH = path.resolve(__dirname, `${process.env.CONTRAST_SERVER_STATIC_PATH}`)

const app = express()

app.use(bodyParser.json({ limit: '10mb' }))
app.use(cookieParser())

app.use('/api', routes)

app.use('/static', express.static(`${STATIC_PATH}/static`, {
  maxAge: '1y',
  fallthrough: false
}))

app.get('*', (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.sendFile(`${STATIC_PATH}/index.html`)
})

app.use(errorHandler({ logger }))

app.listen(process.env.CONTRAST_SERVER_PORT, () => {
  logger.info(`Contrast server listens at ${process.env.CONTRAST_SERVER_PORT}`)
})
