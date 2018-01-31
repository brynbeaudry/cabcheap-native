// ------------------------------------
// Imports
// ------------------------------------
// import {defaultStore} from '../../../store/createStore'
import AuthService from '../api/auth'

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

// ------------------------------------
// Actions
// ------------------------------------
/* User object should be structured to include all relevant information
payload should be an axios.post(register roue, user)
*/
export function register (user = {}) {
  return {
    type    : REGISTER_USER,
    payload : {
      promise: AuthService.register(user)
    }
  }
}

export function loginWithEmail (user = {}) {
  return {
    type    : LOGIN_USER_EMAIL,
    payload : {
      promise: AuthService.loginWithEmail(user)
    },
    meta : user.email
  }
}

export function loginWithFacebook (user = {}) {
  return {
    type    : LOGIN_USER_FACEBOOK,
    payload : {
      promise: AuthService.loginWithFacebook(user)
    },
    meta : user.email
  }
}

export function loginWithGoogle (user = {}) {
  return {
    type    : LOGIN_USER_GOOGLE,
    payload : {
      promise: AuthService.loginWithGoogle(user)
    },
    meta : user.email
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
  register, loginWithEmail, loginWithGoogle, loginWithFacebook
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REGISTER_USER_PENDING]  : (state, action) => {
    return ({ ...state,
      token : null,
      user : null,
      error: null,
      fetching : true,
    })
  },
  [REGISTER_USER_REJECTED] : (state, action) => {
    return ({ ...state,
      token : null,
      user : null,
      error: action.payload,
      fetching : false,
    })
  },
  [REGISTER_USER_FULFILLED] : (state, action) => {
    return ({ ...state,
      token: action.payload,
      user : null,
      error: null,
      fetching : false,
    })
  },
  [LOGIN_USER_EMAIL_PENDING]  : (state, action) => {
    return ({ ...state,
      token : null,
      user : null,
      error: null,
      fetching : true,
    })
  },
  [LOGIN_USER_EMAIL_REJECTED] : (state, action) => {
    return ({ ...state,
      token : null,
      user : null,
      error: action.payload,
      fetching : false,
    })
  },
  [LOGIN_USER_EMAIL_FULFILLED] : (state, action) => {
    return ({ ...state,
      token: action.payload.auth.access_token,
      user : action.payload.user,
      error: null,
      fetching : false,
    })
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0
export default function authReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
