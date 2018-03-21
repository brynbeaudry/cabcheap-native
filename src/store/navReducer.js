import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import { logout } from "../services/modules/auth";
import { AppNavigator } from '../navigators/AppNavigator';

// Start with two routes: The Main screen, with the Login screen on top.
// Start with two routes: The Main screen, with the Login screen on top.
const mainDrawerAction = NavigationActions.init()
const mainDrawerState = AppNavigator.router.getStateForAction(mainDrawerAction)
//const tempNavState = AppNavigator.router.getStateForAction(firstAction);
/* const tempNavState=AppNavigator.router.getStateForAction(NavigationActions.reset({
	index: 0,
	actions: [
	  NavigationActions.navigate({
		routeName: 'Main',
	  }),
	],
})) */
//const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('Login');
const initialNavState = AppNavigator.router.getStateForAction(
  secondAction,
  mainDrawerState
);

//NavigationActions back goes back on login, because you want to get back to where you wqere before login
function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case 'Login':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;
    case 'Register':
    nextState = AppNavigator.router.getStateForAction(
      NavigationActions.navigate({ routeName: 'Register' }),
      state
    );
    break;
    case 'Logout':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }),
        state
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}


const navReducer = nav

export default navReducer;
