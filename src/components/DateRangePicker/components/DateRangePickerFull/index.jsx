import React, { useRef } from 'react';

import { Actions } from '../Actions';
import { BackDrop } from '../BackDrop';
import { Calendar } from '../Calendar';
import { RangeList } from '../RangeList';
import { TimeZone } from '../TimeZone';

import { Provider } from '../../context';
import { CALENDAR } from '../../constants';
import { useDateRangeData } from '../../hooks';

import styles from './dateRangePickerFull.module.scss';

/**
 * Date Range Picker
 *
 * input format: DD/MM/YYYY HH:MM P
 * input example: 09/07/2024 01:18 AM - 09/07/2024 08:18 PM
 *
 */
export const DateRangePickerFull = ({
  theme = 'light',
  onChange = () => {},
}) => {
  const inputRef = useRef();
  const inputRect = inputRef?.current?.getBoundingClientRect();

  const {
    contextProviderValue,
    inputValue,
    isCustom,
    isPanelVisible,
    showPanel,
    onApplyClick,
    onCancelClick,
    onInputChange,
  } = useDateRangeData({ onChange });

  return (
    <Provider value={contextProviderValue}>
      <div className={`${styles.dateRangePickerFull} ${styles[theme]}`}>
        <input
          className={styles.dateInputField}
          type="text"
          value={inputValue}
          onChange={onInputChange}
          onClick={showPanel}
          ref={inputRef}
        />
        {isPanelVisible && <BackDrop onClick={onApplyClick} />}
        {isPanelVisible && (
          <div
            className={styles.dateInputPanel}
            style={{ top: inputRect?.top + inputRect?.height + 5, right: 10 }}
          >
            <div className={styles.rangeSelectors}>
              {/* TODO: unlock when the calendar logic will be finished */}
              {/* {isCustom && <Calendar name={CALENDAR.first} />} */}
              {/* {isCustom && <Calendar name={CALENDAR.second} />} */}
              <div className={styles.rightPanel}>
                <RangeList theme={theme} />
                <TimeZone disabled />
                <Actions
                  theme={theme}
                  onApply={onApplyClick}
                  onCancel={onCancelClick}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Provider>
  );
};
