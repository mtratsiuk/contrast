export const setInput = (model, value, invalid, { config } = {}) => ({
  type: 'FORMS.SET_INPUT',
  model,
  payload: {
    value,
    invalid,
    ...config
  }
})

let fieldKey = 0

export const addMultiInputField = model => ({
  type: 'FORMS.ADD_MULTIINPUT_FIELD',
  model,
  fieldKey: fieldKey++
})

export const removeMultiInputField = (model, fieldModel) => ({
  type: 'FORMS.REMOVE_MULTIINPUT_FIELD',
  model,
  fieldModel
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

export const clearForm = model => ({
  type: 'FORMS.CLEAR_FORM',
  model
})
