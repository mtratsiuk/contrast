const initialState = {
  all: [],
  filtered: [],
  current: null,
  balance: 0,
  filteredBalance: 0,
  autocomplete: {
    names: [],
    tags: [],
    categories: []
  }
}

const transactions = (state = initialState, action) => {
  switch (action.type) {
    case 'TRANSACTIONS.DATA_LOADED': {
      return action.payload
    }
    case 'TRANSACTIONS.CURRENT_LOADED': {
      return _.set('current', action.payload, state)
    }
    case 'TRANSACTIONS.UPDATE_FILTERED': {
      return _.assign(state, action.payload)
    }
  }
  return state
}

export default transactions
