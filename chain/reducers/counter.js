function counterReducer(state, tx) {
  let { type } = tx
  switch (type) {
    case 'INCREMENT':
        return { ...state,
          counter: {
            ...state.counter,
            count: state.counter.count + 1
          }
        }
    case 'DECREMENT':
        return { ...state,
          counter: {
            ...state.counter,
            count: state.counter.count - 1
          }
        }
    default:
        return state
  }
}

module.exports = counterReducer