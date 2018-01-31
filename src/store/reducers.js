import { combineReducers } from 'redux'
import lastActionReducer from './lastActionReducer'
import authReducer from '../services/modules/auth'
import navReducer from './navReducer';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    nav: navReducer,
    lastAction : lastActionReducer,
    auth : authReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
