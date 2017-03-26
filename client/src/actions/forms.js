export const setInput = (model, value, invalid) => ({
  type: 'FORMS.SET_INPUT',
  model,
  payload: {
    value,
    invalid
  }
})

export const validateInput = (model, invalid) => ({
  type: 'FORMS.SET_INPUT_VALIDATION',
  model,
  payload: {
    invalid
  }
})
