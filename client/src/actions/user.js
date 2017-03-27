import * as contrast from 'services/contrast'
import logger from 'shared/logger'
import * as storage from 'utils/storage'

export const signup = (name, password) => async dispatch => {
  try {
    let { data } = await contrast.signup(name, password)
    storage.set('user', data)
    dispatch({
      type: 'USER.LOGIN',
      payload: data
    })
  } catch (error) {
    logger.error(error)
  }
}
