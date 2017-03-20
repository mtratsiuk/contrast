export const setInput = (model, value, invalid) => ({
  type: 'FORMS.SET_INPUT',
  model,
  payload: {
    value,
    invalid
  }
})
