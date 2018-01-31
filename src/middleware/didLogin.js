import { NavigationActions } from 'react-navigation';

export const didLogIn = store => next => action => {
  console.log(`Did Log In ____________\n
      ${store}\n${next}\n${action}\n
  `)
  if (action.type === 'LOGIN_USER_FULFILLED') {
    //next(action)
    store.dispatch(NavigationActions.reset({
       routeName: "Main",
        index : 0
    }))
    // somehwo this interrupts the fullfilled
  }
  return next(action)
}

export default didLogIn