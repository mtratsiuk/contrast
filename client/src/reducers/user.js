import storage from 'utils/storage'

const getUserFromStorage = () => {
  try {
    return JSON.parse(storage.getItem('user'))
  } catch (error) {
    return null
  }
}

const user = (state = getUserFromStorage(), action) => {
  switch (action.type) {
    case 'USER.LOGIN':
      return action.payload
    case 'USER.LOGOUT':
      return null
  }
  return state
}

export default user
