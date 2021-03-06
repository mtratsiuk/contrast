import pouch from 'services/pouch'
import getModels from 'models'

let db = null
let models = null

const thunkMiddleware = ({ dispatch, getState }) => next => action => {
  if (typeof action !== 'function') return next(action)

  let nextDb = pouch.getDb()
  if (nextDb !== db) {
    db = nextDb
    models = db ? getModels(db) : null
  }
  return action(dispatch, { models, getState })
}

export default thunkMiddleware
