import operation from 'models/operation'

export const getModels = db => ({
  Operation: operation(db)
})

export default getModels
