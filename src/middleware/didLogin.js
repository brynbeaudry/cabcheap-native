import { NavigationActions } from 'react-navigation';

export const didLogIn = store => next => action => {
  
  if (action.type === 'LOGIN_USER_EMAIL_FULFILLED') {
    next(action)
    console.log(`Did Log In ____________\n
      
    `)
    store.dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Main'})
      ]
    }))
    // somehwo this interrupts the fullfilled
    next(action)
  }
  return next(action)
}

export default didLogIn