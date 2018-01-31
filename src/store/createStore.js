import { applyMiddleware, compose, createStore as createReduxStore } from 'redux'
import thunk from 'redux-thunk'
import makeRootReducer from './reducers'
import logger from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'


const createStore = (initialState = {}) => {
  let composeEnhancers = compose
  
  const middleware = [
    thunk,
    promiseMiddleware(),
    logger,
  ]
  const enhancers = []

  const store = createReduxStore(
    makeRootReducer(), 
    initialState,
    composeEnhancers(
        applyMiddleware(...middleware),
        ...enhancers
    )
  )

  store.asyncReducers = {}

  return store
}

export default createStore
