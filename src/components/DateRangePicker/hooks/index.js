import { useCallback, useEffect, useMemo, useState } from 'react';

import { RANGE, RANGE_ITEMS } from '../constants';
import { getFormattedDate, parseDateRange } from '../utils';

const getFromRange = (value, to = Date.now()) =>
  new Date(to - RANGE_ITEMS.find((item) => item.value === value).range);

export const useDates = ({
  defaultValue,
  defaultRange = RANGE.d2,
  debounceDelay = 1000,
} = {}) => {
  const [activeRangeItem, setActiveRangeItem] = useState(defaultRange);
  const [fromDate, setFromDate] = useState(
    getFromRange(defaultRange === RANGE.custom ? RANGE.m1 : defaultRange)
  );
  const [toDate, setToDate] = useState(new Date());

  const [inputValue, setInputValue] = useState(
    defaultValue || getFormattedDate(fromDate, toDate)
  );

  const updateInputValue = useCallback((from, to) => {
    const formattedDate = getFormattedDate(from, to);

    if (formattedDate && formattedDate !== inputValue) {
      setInputValue(formattedDate);
    }
  }, []);

  const handleRangeChange = useCallback(
    (value) => {
      if (value !== RANGE.custom) {
        const to = new Date();
        const from = getFromRange(value, to.getTime());

        setFromDate(from);
        setToDate(to);
        updateInputValue(from, to);
      }

      setActiveRangeItem(value);
    },
    [updateInputValue]
  );

  const handleInputChange = useCallback((event) => {
    setActiveRangeItem(RANGE.custom);
    setInputValue(event.target.value);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        const { date1, date2 } = parseDateRange(inputValue);

        setFromDate(date1);
        setToDate(date2);
        updateInputValue(date1, date2);
      } catch (error) {
        updateInputValue(fromDate, toDate);
      }
    }, debounceDelay);

    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  return useMemo(
    () => ({
      activeRangeItem,
      inputValue,
      fromDate,
      toDate,
      onInputChange: handleInputChange,
      onRangeChange: handleRangeChange,
      setInputValue,
      setFromDate,
      setToDate,
    }),
    [
      activeRangeItem,
      inputValue,
      fromDate,
      toDate,
      handleInputChange,
      handleRangeChange,
      setInputValue,
      setFromDate,
      setToDate,
    ]
  );
};
