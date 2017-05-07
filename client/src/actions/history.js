export const getTransactions = () => async (dispatch, { models: { Transaction } }) => {
  let transactions = await Transaction.getAll()
  return dispatch({
    type: 'HISTORY.TRANSACTIONS_LOADED',
    payload: transactions
  })
}
