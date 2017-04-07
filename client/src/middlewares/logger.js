const loggingMiddleware = store => next => action => {
  if (!__DEV__) return next(action)

  console.group(action.type)
  console.info('Dispatching:')
  console.log(action)

  let result = next(action)

  console.info('Next state:')
  console.log(store.getState())
  console.groupEnd(action.type)

  return result
}

export default loggingMiddleware
