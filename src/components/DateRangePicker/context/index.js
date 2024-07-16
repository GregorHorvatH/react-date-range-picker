import { createContext } from 'react';

import { RANGE, RANGE_ITEMS, TIME_ZONE } from '../constants';
import { getDatesFromRange } from '../utils';

const initialRange = RANGE.m1;
const initialInputStr = getDatesFromRange(RANGE_ITEMS, initialRange);
const initialTimeZone = TIME_ZONE.local;

// ------------------------------------------------------------
// CHANGE THE INITIAL STATE ONLY!!!!
// the property key should be at least 2 letters long
// ------------------------------------------------------------
export const INITIAL_STATE = {
  isPanelVisible: false,
  actualModule: null,
  firstCalendarInputStr: '',

  activeRangeItem: initialRange,
  nextActiveRangeItem: initialRange,

  dateRangeInputStr: initialInputStr,
  nextDateRangeInputStr: initialInputStr,
  nextDateRangeUpdated: Date.now(),

  timeZone: initialTimeZone,
  nextTimeZone: initialTimeZone,
};

// ------------------------------------------------------------
// CHANGE THE INITIAL STATE ONLY!!!!
// DON'T NEED TO CHANGE THE ACTIONS AND THE REDUCER
//
// the "set actions" and "set functions: are created automatically
//
// the "set actions" are created from the initial state property names
// by adding 'set' to the front, and making the first letter uppercase
// e.g:
//   - isPanelVisible  --> setIsPanelVisible
//   - actualModule    --> setActualModule
//   - activeRangeItem --> setActiveRangeItem
//
// the set functions just work like "useState" fucntions,
// only set the payload as the current value to the state
// e.g.
//   - setIsPanelVisible(true) -->
//        return { ...state, isPanelVisible: payload };
// ------------------------------------------------------------
export const actionTypesArray = Object.keys(INITIAL_STATE).map(
  (key) => `set${key[0].toUpperCase() + key.slice(1)}`
);

export const reducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  const key = type.slice(3)[0].toLowerCase() + type.slice(4);

  return actionTypesArray.find((actionType) => actionType === type)
    ? { ...state, [key]: payload }
    : state;
};

export const createActions = (dispatch) =>
  actionTypesArray.reduce(
    (acc, action) => ({
      ...acc,
      [action]: (payload) => dispatch({ type: action, payload }),
    }),
    {}
  );

export const dateRangePickerContext = createContext();
export const Provider = dateRangePickerContext.Provider;
