import React, { useState } from 'react';

import { Radio } from '../Radio';
import { TIME_ZONE, TIME_ZONES } from '../../constants';

import styles from './timeZone.module.scss';

export const TimeZone = ({
  defaultValue = TIME_ZONE.local,
  onChange = () => {},
}) => {
  const [activeValue, setActiveValue] = useState(defaultValue);

  const handleChange = (e) => {
    setActiveValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className={styles.timeZone}>
      {TIME_ZONES.map(([key, value]) => (
        <Radio
          activeValue={activeValue}
          key={key}
          value={value}
          onChange={handleChange}
        />
      ))}
    </div>
  );
};
