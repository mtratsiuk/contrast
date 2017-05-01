export const createTransaction = payload => async (dispatch, { models: { Transaction } }) => {
  let transaction = new Transaction(payload)
  await transaction.save()
  // TODO: Error handling
}

export const getAutocompleteItems = () => async (dispatch, { models: { Transaction } }) => {
  return dispatch({
    type: 'TRANSACTION.AUTOCOMPLETE_ITEMS_LOADED',
    payload: await Transaction.getFieldsSuggestions()
  })
}
