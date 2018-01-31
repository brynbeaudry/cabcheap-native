/* ACTIONS */

import { createAction } from 'redux-actions';
import {
  NAVIGATION_PUSH,
  NAVIGATION_POP,
  NAVIGATION_RESET_TO,
  NAVIGATION_POP_TO_ROOT
} from './actions';

export const push = createAction(NAVIGATION_PUSH);
export const pop = createAction(NAVIGATION_POP);
export const resetTo = createAction(NAVIGATION_RESET_TO);
export const popToRoot = createAction(NAVIGATION_POP_TO_ROOT);

/* NAVIGATION */

let currentNavigator = null;

export function setNavigator(navigator) {
  currentNavigator = navigator;
}

function push(action) {
  currentNavigator.push(action.payload);
}

function pop(action) {
  currentNavigator.pop(action.payload);
}

function resetTo(action) {
  currentNavigator.resetTo(action.payload);
}

function popToRoot() {
  currentNavigator.popToRoot();
}