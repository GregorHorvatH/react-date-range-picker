import React, { useState } from 'react';

import { Dropdown } from '../Dropdown';
import { RANGE, SHORT_RANGE_ITEMS } from '../../constants';
import { getDatesFromRange, parseDateRange } from '../../utils';

import styles from './dateRangePickerShort.module.scss';

const ITEMS = SHORT_RANGE_ITEMS.map(({ value }) => value);

export const DateRangePickerShort = ({ theme, onChange }) => {
  const [value, setValue] = useState(RANGE.lastH12);
  const [isOpen, setIsOpen] = useState(false);

  const hideList = () => setIsOpen(false);
  const toggleList = () => setIsOpen((prev) => !prev);

  const handleChange = (newValue) => {
    const formattedDateRangeStr = getDatesFromRange(
      SHORT_RANGE_ITEMS,
      newValue
    );
    const item = parseDateRange(formattedDateRangeStr);

    setValue(newValue);
    onChange({ activeRangeItem: newValue, ...item });
  };

  return (
    <>
      {/* <div className={styles.dateRangePickerShort}>
        <span>Show:</span>
        <Dropdown
          value={value}
          items={ITEMS}
          name="short-range-selector"
          isOpen={isOpen}
          onChange={handleChange}
          onHide={hideList}
          onToggle={toggleList}
        />
      </div> */}
      <div className={styles.dateRangePickerShort}>
        <span>Show:</span>
        <Dropdown
          className={styles.shortDropdown}
          value={value}
          items={ITEMS}
          name="short-range-selector"
          isOpen={isOpen}
          onChange={handleChange}
          onHide={hideList}
          onToggle={toggleList}
          theme={theme}
          variant="text"
          withShadow
        />
      </div>
    </>
  );
};
