import * as contrast from 'services/contrast'
import * as storage from 'utils/storage'

export const signup = (name, password) => async dispatch => {
  let { data } = await contrast.signup(name, password)
  storage.set('user', data)
  dispatch({
    type: 'USER.LOGIN',
    payload: data
  })
}

export const login = (name, password) => async dispatch => {
  let { data } = await contrast.login(name, password)
  storage.set('user', data)
  dispatch({
    type: 'USER.LOGIN',
    payload: data
  })
}

export const logout = () => async dispatch => {
  try {
    await contrast.logout()
  } finally {
    storage.clear()
    dispatch({ type: 'USER.LOGOUT' })
  }
}
