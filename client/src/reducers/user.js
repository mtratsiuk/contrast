import { get } from 'utils/storage'

const user = (state = get('user'), action) => {
  switch (action.type) {
    case 'USER.LOGIN':
      return action.payload
    case 'USER.LOGOUT':
      return null
  }
  return state
}

export default user
