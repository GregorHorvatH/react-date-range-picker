import { useCallback, useEffect, useState, useContext, useMemo } from 'react';

import { DEBOUNCE_DELAY } from '../constants';
import { dateRangePickerContext } from '../context';
import {
  createDateString,
  getDateParams,
  getDateStrFromRangeStr,
  getFormattedRangeStr,
  parseDate,
} from '../utils';

export const useCalendarData = ({ name }) => {
  const {
    state: { actualModule, nextDateRangeInputStr },
    actions,
  } = useContext(dateRangePickerContext);
  const [timeoutId, setTimeoutId] = useState(null);
  const [inputValue, setInputValue] = useState(
    getDateStrFromRangeStr(name, nextDateRangeInputStr)
  );
  const [prevValue, setPrevValue] = useState(
    getDateStrFromRangeStr(name, nextDateRangeInputStr)
  );

  const { year, month, day, hours, minutes, period } = getDateParams(
    parseDate(getDateStrFromRangeStr(name, nextDateRangeInputStr)).date
  );

  const updateInputValue = useCallback(
    ({ value, force }) => {
      setInputValue(value);
      clearTimeout(timeoutId);
      setTimeoutId(
        setTimeout(
          () => {
            try {
              const { formattedDate } = parseDate(value);
              const formattedRangeStr = getFormattedRangeStr({
                name,
                nextDateRangeInputStr,
                formattedDate,
              });

              setPrevValue(formattedDate);
              setPrevValue(formattedDate);
              actions.setNextDateRangeInputStr(formattedRangeStr);
            } catch (error) {
              setInputValue(prevValue);
            }
          },
          force ? 0 : DEBOUNCE_DELAY
        )
      );
    },
    [prevValue, timeoutId]
  );

  const updateInputByTime = ({ key, value, force }) => {
    updateInputValue({
      value: createDateString({
        year,
        month,
        day,
        hours,
        minutes,
        period,
        [key]: value,
      }),
      force,
    });
  };

  const onYearChange = (value) =>
    updateInputByTime({ key: 'year', value, force: true });
  const onMonthChange = (value) =>
    updateInputByTime({ key: 'month', value, force: true });
  const onDayChange = (value) =>
    updateInputByTime({ key: 'day', value, force: true });
  const onHoursChange = (value) =>
    updateInputByTime({ key: 'hours', value, force: true });
  const onMinutesChange = (value) =>
    updateInputByTime({ key: 'minutes', value, force: true });
  const onPeriodChange = (value) =>
    updateInputByTime({ key: 'period', value, force: true });

  const onInputChange = useCallback(
    (e) => {
      const { value } = e.target;
      if (value === prevValue) return;
      updateInputValue({ value });
    },
    [prevValue]
  );

  const onHideList = useCallback(() => actions.setActualModule(null), []);
  const onToggleList = useCallback(
    ({ actualModule, name }) =>
      actions.setActualModule(actualModule ? null : name),
    []
  );

  useEffect(() => {
    if (inputValue !== nextDateRangeInputStr) {
      setInputValue(getDateStrFromRangeStr(name, nextDateRangeInputStr));
      setPrevValue(getDateStrFromRangeStr(name, nextDateRangeInputStr));
    }
  }, [nextDateRangeInputStr]);

  return useMemo(
    () => ({
      actualModule,
      inputValue,
      year,
      month,
      day,
      hours,
      minutes,
      period,
      onHideList,
      onToggleList,
      onYearChange,
      onMonthChange,
      onDayChange,
      onInputChange,
      onHoursChange,
      onMinutesChange,
      onPeriodChange,
    }),
    [
      actualModule,
      inputValue,
      year,
      month,
      day,
      hours,
      minutes,
      period,
      onHideList,
      onToggleList,
      onYearChange,
      onMonthChange,
      onDayChange,
      onInputChange,
      onHoursChange,
      onMinutesChange,
      onPeriodChange,
    ]
  );
};
