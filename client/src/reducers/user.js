import userService from 'services/user'

const user = (state = userService.getData(), action) => {
  switch (action.type) {
    case 'USER.LOGIN':
      return action.payload
    case 'USER.LOGOUT':
      return null
  }
  return state
}

export default user
