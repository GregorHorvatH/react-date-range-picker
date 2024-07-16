import { useCallback, useEffect, useReducer, useMemo, useState } from 'react';

import { createActions, reducer, INITIAL_STATE } from '../context';
import { DEBOUNCE_DELAY, RANGE } from '../constants';
import { parseDateRange } from '../utils';

export const useDateRangeData = ({ onChange }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const actions = useMemo(() => createActions(dispatch), [dispatch]);

  const contextProviderValue = useMemo(
    () => ({ state, actions }),
    [state, actions]
  );

  const {
    isPanelVisible,
    activeRangeItem,
    nextActiveRangeItem,
    dateRangeInputStr,
    nextDateRangeInputStr,
    timeZone,
    nextTimeZone,
  } = state;

  const [inputValue, setInputValue] = useState(nextDateRangeInputStr);
  const [prevValue, setPrevValue] = useState(nextDateRangeInputStr);
  const [timeoutId, setTimeoutId] = useState(null);

  const isCustom = nextActiveRangeItem === RANGE.custom;

  const showPanel = useCallback(
    () => actions.setIsPanelVisible(true),
    [actions]
  );
  const hidePanel = useCallback(
    () => actions.setIsPanelVisible(false),
    [actions]
  );

  const onApplyClick = useCallback(() => {
    const item = parseDateRange(nextDateRangeInputStr);

    actions.setActiveRangeItem(nextActiveRangeItem);
    actions.setDateRangeInputStr(nextDateRangeInputStr);
    actions.setTimeZone(nextTimeZone);
    onChange({ activeRangeItem: nextActiveRangeItem, ...item });
    hidePanel();
  }, [actions, nextActiveRangeItem, nextDateRangeInputStr, hidePanel]);

  const onCancelClick = useCallback(() => {
    actions.setNextActiveRangeItem(activeRangeItem);
    actions.setNextDateRangeInputStr(dateRangeInputStr);
    actions.setNextDateRangeInputStr(dateRangeInputStr);
    actions.setNextTimeZone(timeZone);
    hidePanel();
  }, [actions, dateRangeInputStr, hidePanel]);

  const onInputChange = useCallback(
    (e) => {
      const { value } = e.target;

      if (prevValue === value) return;

      setInputValue(value);
      clearTimeout(timeoutId);
      setTimeoutId(
        setTimeout(() => {
          try {
            const { formattedDateRange } = parseDateRange(value);

            setInputValue(formattedDateRange);
            setPrevValue(formattedDateRange);
            actions.setNextDateRangeInputStr(formattedDateRange);
            actions.setNextActiveRangeItem(RANGE.custom);
          } catch (error) {
            setInputValue(prevValue);
          }
        }, DEBOUNCE_DELAY)
      );
    },
    [prevValue, timeoutId]
  );

  useEffect(() => {
    if (inputValue !== nextDateRangeInputStr) {
      setInputValue(nextDateRangeInputStr);
      setPrevValue(nextDateRangeInputStr);
    }
  }, [nextDateRangeInputStr]);

  return useMemo(
    () => ({
      contextProviderValue,
      isCustom,
      isPanelVisible,
      inputValue,
      showPanel,
      hidePanel,
      onApplyClick,
      onCancelClick,
      onInputChange,
      onInputChange,
    }),
    [
      contextProviderValue,
      isCustom,
      isPanelVisible,
      inputValue,
      showPanel,
      hidePanel,
      onApplyClick,
      onCancelClick,
      onInputChange,
    ]
  );
};
