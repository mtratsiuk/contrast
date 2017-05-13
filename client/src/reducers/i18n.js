const initialState = {
  language: null
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'I18N.SET_LANGUAGE':
      return _.set('language', action.payload, state)
  }
  return state
}

export default user
