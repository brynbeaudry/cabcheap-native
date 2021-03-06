// ------------------------------------
// Imports
// ------------------------------------
// import {defaultStore} from '../../../store/createStore'
import AuthService from '../api/auth'
import { AppNavigator } from '../../navigators/AppNavigator';

// ------------------------------------
// Constants
// ------------------------------------
export const REGISTER_USER =                  'REGISTER_USER'
export const REGISTER_USER_PENDING =          'REGISTER_USER_PENDING'
export const REGISTER_USER_REJECTED =         'REGISTER_USER_REJECTED'
export const REGISTER_USER_FULFILLED =        'REGISTER_USER_FULFILLED'
export const LOGIN_USER_EMAIL =               'LOGIN_USER_EMAIL'
export const LOGIN_USER_EMAIL_PENDING =       'LOGIN_USER_EMAIL_PENDING'
export const LOGIN_USER_EMAIL_REJECTED =      'LOGIN_USER_EMAIL_REJECTED'
export const LOGIN_USER_EMAIL_FULFILLED =     'LOGIN_USER_EMAIL_FULFILLED'
export const LOGIN_USER_FACEBOOK =            'LOGIN_USER'
export const LOGIN_USER_FACEBOOK_PENDING =    'LOGIN_USER_FACEBOOK_PENDING'
export const LOGIN_USER_FACEBOOK_REJECTED =   'LOGIN_USER_FACEBOOK_REJECTED'
export const LOGIN_USER_FACEBOOK_FULFILLED =  'LOGIN_USER_FACEBOOK_FULFILLED'
export const LOGIN_USER_GOOGLE =              'LOGIN_USER_GOOGLE'
export const LOGIN_USER_GOOGLE_PENDING =      'LOGIN_USER_GOOGLE_PENDING'
export const LOGIN_USER_GOOGLE_REJECTED =     'LOGIN_USER_GOOGLE_REJECTED'
export const LOGIN_USER_GOOGLE_FULFILLED =    'LOGIN_USER_GOOGLE_FULFILLED'
export const LOGOUT_USER =                    'LOGOUT_USER'
export const LOGOUT_USER_PENDING =            'LOGOUT_USER_PENDING'
export const LOGOUT_USER_REJECTED =           'LOGOUT_USER_REJECTED'
export const LOGOUT_USER_FULFILLED =          'LOGOUT_USER_FULFILLED'


// ------------------------------------
// Actions
// ------------------------------------
/* User object should be structured to include all relevant information
payload should be an axios.post(register roue, user)
*/
export function register (user = {}) {
  console.log(`in register`)
  return {
    type    : REGISTER_USER,
    payload : {
      promise: AuthService.register(user)
    },
    meta    : user
  }
}

export function loginWithEmail (email, password) {
  return {
    type    : LOGIN_USER_EMAIL,
    payload : {
      promise: AuthService.loginWithEmail(email, password)
    }
  }
}

export function loginWithFacebook () {
  return {
    type    : LOGIN_USER_FACEBOOK,
    payload : {
      promise: AuthService.loginWithFacebook()
    },
  }
}

export function loginWithGoogle () {
  return {
    type    : LOGIN_USER_GOOGLE,
    payload : {
      promise: AuthService.loginWithGoogle(user)
    },
  }
}

export function logout (accessToken, userId) {
  return {
    type    : LOGOUT_USER,
    payload : {
      promise: AuthService.logout(accessToken, userId)
    },
  }
}


/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */
/*
export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type    : COUNTER_DOUBLE_ASYNC,
          payload : getState().counter
        })
        resolve()
      }, 200)
    })
  }
}
*/
export const actions = {
  register, loginWithEmail, loginWithGoogle, loginWithFacebook, logout
}

// ------------------------------------
// Action Handlers
// ------------------------------------
/* const ACTION_HANDLERS = {
  [REGISTER_USER_PENDING]  : (state, action) => {
    return ({ ...state,
      error: undefined,
      fetching : true,
    })
  },
  [REGISTER_USER_REJECTED] : (state, action) => {
    return ({ ...state,
      error: action.payload,
      fetching : false,
    })
  },
  [REGISTER_USER_FULFILLED] : (state, action) => {
    return ({ ...state,
      error: undefined,
      fetching : false,
    })
  },
  [LOGIN_USER_EMAIL_PENDING]  : (state, action) => {
    return ({ ...state,
      error: undefined,
      fetching : true,
    })
  },
  [LOGIN_USER_EMAIL_REJECTED] : (state, action) => {
    return ({ ...state,
      error: action.payload,
      fetching : false,
    })
  },
  [LOGIN_USER_EMAIL_FULFILLED] : (state, action) => {
    return ({ ...state,
      auth: { isLoggedIn : true, ...action.payload },
      user : action.payload.user,
      error: undefined,
      fetching : false,
    })
  },
  [LOGIN_USER_FACEBOOK_PENDING]  : (state, action) => {
    return ({ ...state,
      error: undefined,
      fetching : true,
    })
  },
  [LOGIN_USER_FACEBOOK_REJECTED] : (state, action) => {
    return ({ ...state,
      error: action.payload,
      fetching : false,
    })
  },
  [LOGIN_USER_FACEBOOK_FULFILLED] : (state, action) => {
    return ({ ...state,
      auth: { isLoggedIn : true, ...action.payload },
      user : action.payload.user,
      error: undefined,
      fetching : false,
    })
  },
}

export default function authReducer (state = {}, action) {
  console.log(`In auth reducer state: ${JSON.stringify(state)} action : ${JSON.stringify(action)}`)
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
} */
const initialAuthState = { isLoggedIn: false, fetching : false, error : null };
const authReducer = (state = initialAuthState, action) => {
  //console.log(`In auth reducer state: ${JSON.stringify(state)} action : ${JSON.stringify(action)}`)
  switch (action.type) {
    case REGISTER_USER_PENDING: 
      return ({ ...state,
        error: undefined,
        fetching : true,
      })
    case REGISTER_USER_REJECTED:
      return ({ ...state,
        error: action.payload.errors[0],
        fetching : false,
      })
    case REGISTER_USER_FULFILLED:
      return ({ ...state,
        error: undefined,
        fetching : false,
      })
    case LOGIN_USER_EMAIL_PENDING:
      return ({ ...state,
        error: undefined,
        fetching : true,
        isLoggedIn: false,
      })
    case LOGIN_USER_EMAIL_REJECTED:
      return ({ ...state,
        error: action.payload.errors[0],
        fetching : false,
        isLoggedIn: false,
      })
    case LOGIN_USER_EMAIL_FULFILLED:
      return({...state,
        ...action.payload,
        error: undefined,
        fetching : false,
        isLoggedIn: true,
      })
    case LOGIN_USER_FACEBOOK_PENDING:
      return ({ ...state,
        error: undefined,
        fetching : true,
      })
    case LOGIN_USER_FACEBOOK_REJECTED:
      return ({ ...state,
        error: action.payload,
        fetching : false,
        isLoggedIn: false,
      })
    case LOGIN_USER_FACEBOOK_FULFILLED:
      return ({ ...state,
        ...action.payload,
        error: undefined,
        fetching : false,
        isLoggedIn: true,
      })
    case LOGOUT_USER_PENDING:
      return ({ ...state,
        error: undefined,
        fetching : true,
      })
    case LOGOUT_USER_REJECTED:
      return ({ ...state,
        error: action.payload,
        fetching : false,
      })
    case LOGOUT_USER_FULFILLED:
      return ({ ...action.payload,
        error: undefined,
        fetching : false,
        isLoggedIn: false,
      })
    default:
      return state; 
  }
};

export default authReducer

