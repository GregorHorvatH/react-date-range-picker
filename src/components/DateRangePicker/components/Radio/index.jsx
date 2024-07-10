import React from 'react';

import styles from './radio.module.scss';

export const Radio = ({ activeValue, value, onChange = () => {} }) => (
  <div className={styles.radioWrapper}>
    <input
      id={value}
      checked={value === activeValue}
      className={styles.radio}
      type="radio"
      name="time-zone"
      value={value}
      onChange={onChange}
    />
    <label htmlFor={value}>{value}</label>
  </div>
);
