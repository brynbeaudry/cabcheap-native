import { NavigationActions } from 'react-navigation';
import { decodeJWT } from '../util/base64'
import request from '../services/request'

export const didLogIn = store => next => action => {
  
  if (action.type === 'LOGIN_USER_EMAIL_FULFILLED') {
    next(action)
    console.log(`Did Log In ____________
      store : _____ ${ store }
      next : _______ ${ next }
      action : ______ ${ JSON.stringify(action) }
    `)
    
    /* decode Id token */
    let decoded_token = decodeJWT(action.payload.id_token)
    console.log(`Did Log In ____________
      decoded id token :  ${ decoded_token }
    `)
    action.payload.id_token = decoded_token
    console.log(`Did Log In ____________
      decoded id token. sub :  ${ decoded_token.sub }
    `)
    let getUserInfo = request({
        headers : {'Content-Type': 'application/json'},
        method : 'get',
        url: `/api/users/${decoded_token.sub}`,
    })
    getUserInfo.then((user) => {
      console.log(`Did Log In ____________
      user object :  ${ JSON.stringify(user) }
      `)
      action.payload.user = user
      store.dispatch(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Main'})
        ]
      }))
      // somehwo this interrupts the fullfilled
      next(action)
    })
  }
  return next(action)
}

export default didLogIn