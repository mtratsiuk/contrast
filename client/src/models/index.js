import transaction from 'models/transaction'

export const getModels = db => ({
  Transaction: transaction(db)
})

export default getModels
