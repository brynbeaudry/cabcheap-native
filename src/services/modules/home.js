// ------------------------------------
// Imports
// ------------------------------------
// import {defaultStore} from '../../../store/createStore'
/* import MapService from '../api/map' */

// ------------------------------------
// Constants
// ------------------------------------
// export const REGISTER_USER = 'REGISTER_USER'
/* export const GET_ROUTES = 'GET_ROUTES'
export const GET_ROUTES_PENDING = 'GET_ROUTES_PENDING'
export const GET_ROUTES_REJECTED = 'GET_ROUTES_REJECTED'
export const GET_ROUTES_FULFILLED = 'GET_ROUTES_FULFILLED' */

// ------------------------------------
// Actions
// ------------------------------------
/* User object should be structured to include all relevant information
payload should be an axios.post(register roue, user)
*/
/* export function getRoutes (auth, user, startLoc, endLoc) {
  return {
    type    : GET_ROUTES,
    payload : {
      promise: MapService.getRoutes(user)
    }
  }
} */

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
/* export const actions = {
  getRoutes
} */

// ------------------------------------
// Action Handlers
// ------------------------------------
/* const ACTION_HANDLERS = {
  [GET_ROUTES_PENDING]  : (state, action) => ({ ...state, fetching : true }),
  [GET_ROUTES_REJECTED] : (state, action) => ({ ...state, fetching : false, user : null, error : action.payload }),
  [GET_ROUTES_FULFILLED] : (state, action) => ({ fetching : false, token : action.payload.auth.access_token, expires_in : action.payload.auth.expires_in, user :action.payload.user, error: null }),
}
 */
// ------------------------------------
// Reducer
// ------------------------------------
/* const initialState = 0
export default function mapReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
 */
