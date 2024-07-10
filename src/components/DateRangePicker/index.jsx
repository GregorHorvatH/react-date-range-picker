import React, { useRef, useState } from 'react';

import { RANGE, TIME_ZONE } from './constants';
import { Actions, BackDrop, Calendar, RangeList, TimeZone } from './components';
import { localToUtc, utcToLocal } from './utils';
import { useDates } from './hooks';

import styles from './dateRangePicker.module.scss';

/**
 * Date Range Picker
 *
 * input format: DD/MM/YYYY HH:MM P
 * input example: 09/07/2024 01:18 AM - 09/07/2024 08:18 PM
 *
 */
export const DateRangePicker = () => {
  const inputRef = useRef();
  const [showPanel, setShowPanel] = useState(false);
  const {
    activeRangeItem,
    inputValue,
    fromDate,
    toDate,
    onInputChange,
    onRangeChange,
    setInputValue,
  } = useDates({ defaultRange: RANGE.custom });
  const [prevValue, setPrevValue] = useState(inputValue);

  const inputRect = inputRef?.current?.getBoundingClientRect();
  const isCustom = activeRangeItem === RANGE.custom;

  const handleShowPanel = () => setShowPanel(true);
  const handleHidePanel = () => setShowPanel(false);

  const handleApplyClick = () => {
    setPrevValue(inputValue);
    handleHidePanel();
  };

  const handleCancelClick = () => {
    setInputValue(prevValue);
    handleHidePanel();
  };

  // TODO: finish it
  const handleTimeZoneChange = (value) => {
    if (value === TIME_ZONE.utc) {
      console.log('utc from:', localToUtc(fromDate));
      console.log('utc to:', localToUtc(toDate));
    }
    if (value === TIME_ZONE.local) {
      console.log('local from:', utcToLocal(fromDate));
      console.log('local to:', utcToLocal(toDate));
    }
  };

  return (
    <div className={styles.dateRangePicker}>
      <input
        className={styles.dateInputField}
        type="text"
        value={inputValue}
        onChange={onInputChange}
        onClick={handleShowPanel}
        ref={inputRef}
      />
      {showPanel && <BackDrop onClick={handleApplyClick} />}
      {showPanel && (
        <div
          className={styles.dateInputPanel}
          style={{ top: inputRect?.top + inputRect?.height + 5, right: 10 }}
        >
          <div className={styles.rangeSelectors}>
            {isCustom && <Calendar />}
            {isCustom && <Calendar />}
            <div className={styles.rightPanel}>
              <RangeList
                activeRangeItem={activeRangeItem}
                onChange={onRangeChange}
              />
              <TimeZone onChange={handleTimeZoneChange} />
              <Actions
                onApply={handleApplyClick}
                onCancel={handleCancelClick}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
