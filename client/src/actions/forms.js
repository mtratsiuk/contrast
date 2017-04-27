export const setInput = (model, value, invalid) => ({
  type: 'FORMS.SET_INPUT',
  model,
  payload: {
    value,
    invalid
  }
})

export const addMultiInputField = model => ({
  type: 'FORMS.ADD_MULTIINPUT_FIELD',
  model
})

export const setInputValidation = (model, invalid) => ({
  type: 'FORMS.SET_INPUT_VALIDATION',
  model,
  payload: {
    invalid
  }
})

export const setFormSubmitted = (model, value = true) => ({
  type: 'FORMS.SET_FORM_SUBMITTED',
  model,
  payload: value
})

