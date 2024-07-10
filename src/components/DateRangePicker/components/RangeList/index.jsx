import React from 'react';

import { Button } from '../Button';
import { RANGE_ITEMS } from '../../constants';

import styles from './rangeList.module.scss';

export const RangeList = ({ activeRangeItem, onChange }) => {
  return (
    <div className={styles.rangeList}>
      {RANGE_ITEMS.map((item) => (
        <Button
          key={item.value}
          onClick={() => onChange(item.value)}
          variant={activeRangeItem === item.value ? 'light' : 'dark'}
        >
          {item.value}
        </Button>
      ))}
    </div>
  );
};
