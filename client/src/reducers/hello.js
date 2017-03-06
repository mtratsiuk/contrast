const hello = (state = '', action) => {
  switch (action.type) {
    case 'HELLO.SHOW':
      return state ? '' : `${state}${action.payload}`
    default:
      return state
  }
}

export default hello
