import operation from 'models/transaction'

export const getModels = db => ({
  Operation: operation(db)
})

export default getModels
