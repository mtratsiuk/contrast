const forms = (state = {}, action) => {
  switch (action.type) {
    case 'FORMS.SET_INPUT':
      let form = action.model.split('.')[0]
      let nextState = _.set(action.model, action.payload, state)
      nextState[form].invalid = _.some(i => _.isObject(i) && i.invalid, nextState[form])
      return nextState
  }
  return state
}

export default forms
