import logger from 'shared/logger'

const errorHandlingMiddleware = store => next => async action => {
  try {
    return await next(action)
  } catch (error) {
    logger.error(error)
  }
}

export default errorHandlingMiddleware
