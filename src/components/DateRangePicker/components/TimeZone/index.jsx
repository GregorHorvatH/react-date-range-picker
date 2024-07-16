import React, { useContext } from 'react';

import { Radio } from '../Radio';
import { TIME_ZONES } from '../../constants';
import { dateRangePickerContext } from '../../context';

import styles from './timeZone.module.scss';

export const TimeZone = ({ disabled }) => {
  const { state, actions } = useContext(dateRangePickerContext);
  const { nextTimeZone } = state;

  const handleChange = (e) => {
    actions.setNextTimeZone(e.target.value);
  };

  return (
    <div className={styles.timeZone}>
      {TIME_ZONES.map(([key, value]) => (
        <Radio
          activeValue={nextTimeZone}
          disabled={disabled}
          key={key}
          value={value}
          onChange={handleChange}
        />
      ))}
    </div>
  );
};
