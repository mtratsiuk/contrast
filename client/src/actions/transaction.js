export const createTransaction = payload => async (dispatch, { models: { Transaction } }) => {
  payload.value = payload.value.replace(',', '.')
  let transaction = new Transaction(payload)
  await transaction.save() // TODO: Error handling
  dispatch(getAutocompleteItems())
}

export const getAutocompleteItems = () => async (dispatch, { models: { Transaction } }) => {
  return dispatch({
    type: 'TRANSACTION.AUTOCOMPLETE_ITEMS_LOADED',
    payload: {
      ...(await Transaction.getFieldsSuggestions())
    }
  })
}
