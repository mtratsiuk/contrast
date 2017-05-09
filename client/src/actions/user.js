import user from 'services/user'

export const signup = (name, password) => async dispatch => {
  return user.signup(name, password)
}

export const login = (name, password) => async dispatch => {
  return user.login(name, password)
}

export const logout = () => async dispatch => {
  return user.logout()
}
