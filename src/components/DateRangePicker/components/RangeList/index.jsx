import React, { useContext } from 'react';

import { Button } from '../Button';
import { RANGE, RANGE_ITEMS } from '../../constants';
import { dateRangePickerContext } from '../../context';
import { getDatesFromRange } from '../../utils';

import styles from './rangeList.module.scss';

export const RangeList = ({ theme = 'light' }) => {
  const { state, actions } = useContext(dateRangePickerContext);

  const handleRangeChange = (range) => {
    if (range !== RANGE.custom) {
      const formattedDateRange = getDatesFromRange(RANGE_ITEMS, range);

      actions.setNextDateRangeInputStr(formattedDateRange);
    }
    actions.setNextActiveRangeItem(range);
  };

  return (
    <div className={styles.rangeList}>
      {RANGE_ITEMS.map((item) => (
        <Button
          key={item.value}
          onClick={() => handleRangeChange(item.value)}
          variant={
            state.nextActiveRangeItem === item.value ? 'primary' : 'secondary'
          }
          theme={theme}
        >
          {item.value}
        </Button>
      ))}
    </div>
  );
};
