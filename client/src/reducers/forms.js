const setFormValidation = form => {
  form.invalid = _.some(i => _.isObject(i) && i.invalid, form)
}

const forms = (state = {}, action) => {
  switch (action.type) {
    case 'FORMS.SET_INPUT': {
      let form = action.model.split('.')[0]
      let nextState = _.update(action.model, input => _.merge(input, action.payload), state)
      setFormValidation(nextState[form])
      return nextState
    }
    case 'FORMS.ADD_MULTIINPUT_FIELD': {
      let [form, input] = action.model.split('.')
      let nextState = _.update(
        `${action.model}.fields`,
        (fields = []) => fields.concat(`${form}.__${input}${fields.length}__`),
        state
      )
      return nextState
    }
    case 'FORMS.SET_INPUT_VALIDATION': {
      let form = action.model.split('.')[0]
      let nextState = _.set(`${action.model}.invalid`, action.payload.invalid, state)
      setFormValidation(nextState[form])
      return nextState
    }
    case 'FORMS.SET_FORM_SUBMITTED': {
      return _.set(`${action.model}.submitted`, action.payload, state)
    }
    case 'FORMS.CLEAR_FORM': {
      return _.pipe(
        _.omit(action.model),
        _.set(`${action.model}.submitted`, false)
      )(state)
    }
  }
  return state
}

export default forms
