import { combineReducers } from 'redux'
import navReducer from './navReducer'
import lastActionReducer from './lastActionReducer'
import authReducer from '../services/modules/auth'

export const makeRootReducer = () => {
  return combineReducers({
    nav: navReducer,
    lastAction : lastActionReducer,
    auth : authReducer
  })
}

export default makeRootReducer
