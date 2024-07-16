// the key should be at least 2 letters long
export const INITIAL_STATE = {
  isPanelVisible: false,
  actualModule: null,
  activeRangeItem: null,
  dateFrom: null,
  dateTo: null,
  dateRangeInputStr: '',
};

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
