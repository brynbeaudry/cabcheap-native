import { NavigationActions } from 'react-navigation';
import { loginWithEmail } from '../services/modules/auth'

export const didRegister = store => next => action => {
  
  if (action.type === 'REGISTER_USER_FULFILLED') {
    next(action)
    console.log(`Did Register ____________\n
      
    `)
    console.log(`action.meta : ${action.meta}`)
    let user = action.meta
    store.dispatch(loginWithEmail(user.email, user.password))
    // somehwo this interrupts the fullfilled
    next(action)
  }
  return next(action)
}

export default didRegister