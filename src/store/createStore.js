import { applyMiddleware, compose, createStore as createReduxStore } from 'redux'
import thunk from 'redux-thunk'
import makeRootReducer from './reducers'
import logger from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import didLogin, { didLogIn } from "../middleware/didLogin";

const createStore = () => {
  let composeEnhancers = compose
  
  const middleware = [
    thunk,
    promiseMiddleware(),
    logger,
    didLogIn
  ]
  const enhancers = []

  const store = createReduxStore(
    makeRootReducer(), 
    undefined,
    composeEnhancers(
        applyMiddleware(...middleware),
        ...enhancers
    )
  )

  store.asyncReducers = {}

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  //store.unsubscribeHistory = browserHistory.listen(updateLocation(store))

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}

export default createStore
