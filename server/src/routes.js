const express = require('express')
const proxy = require('express-http-proxy')
const router = express.Router()

const http = require('./shared/http')
const logger = require('./shared/logger')

const couchService = require('./services/couch')({ http, logger })
const couch = require('./controllers/couch')({ couch: couchService })

router.post('/signup', couch.signup)
router.post('/login', couch.login)
router.post('/logout', couch.logout)

router.get('/sync', couch.welcome)
router.all('/sync/userdb-*', proxy(couchService.COUCH_URL, {
  forwardPath: (req, res) => req.url.slice(req.url.indexOf('sync') + 'sync'.length)
}))

const ratesService = require('./services/rates')({ http, logger })
const rates = require('./controllers/rates')({ rates: ratesService })

router.get('/rates', rates.get)

module.exports = router
