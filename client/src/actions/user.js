import contrast from 'services/contrast'
import user from 'services/user'

const _login = (data, dispatch) => {
  user.login(data)
  return dispatch({
    type: 'USER.LOGIN',
    payload: data
  })
}

export const signup = (name, password) => async dispatch => {
  let { data } = await contrast.signup(name, password)
  return _login(data, dispatch)
}

export const login = (name, password) => async dispatch => {
  let { data } = await contrast.login(name, password)
  return _login(data, dispatch)
}

export const logout = () => async dispatch => {
  try {
    await contrast.logout()
  } finally {
    user.logout()
    dispatch({ type: 'USER.LOGOUT' })
  }
}
