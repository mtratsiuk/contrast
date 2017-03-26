const setFormValidation = form => {
  form.invalid = _.some(i => _.isObject(i) && i.invalid, form)
}

const forms = (state = {}, action) => {
  switch (action.type) {
    case 'FORMS.SET_INPUT': {
      let form = action.model.split('.')[0]
      let nextState = _.set(action.model, action.payload, state)
      setFormValidation(nextState[form])
      nextState[form].lastChanged = action.model
      return nextState
    }
    case 'FORMS.SET_INPUT_VALIDATION': {
      let form = action.model.split('.')[0]
      let nextState = _.set(`${action.model}.invalid`, action.payload.invalid, state)
      setFormValidation(nextState[form])
      return nextState
    }
  }
  return state
}

export default forms
