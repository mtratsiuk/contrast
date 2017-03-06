import 'regenerator-runtime/runtime'
import 'whatwg-fetch'
import 'core-js/fn/object/assign'
import Promise from 'promise-polyfill'

if (!window.Promise) {
  window.Promise = Promise
}
