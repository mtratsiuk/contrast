const initialState = {
  autocomplete: {
    names: [],
    tags: [],
    categories: [],
    currencyCodes: []
  }
}

const transaction = (state = initialState, action) => {
  switch (action.type) {
    case 'TRANSACTION.AUTOCOMPLETE_ITEMS_LOADED': {
      return _.set('autocomplete', action.payload, state)
    }
  }
  return state
}

export default transaction
