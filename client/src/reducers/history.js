const initialState = {
  items: []
}

const history = (state = initialState, action) => {
  switch (action.type) {
    case 'HISTORY.TRANSACTIONS_LOADED': {
      return _.set('items', action.payload, state)
    }
  }
  return state
}

export default history
