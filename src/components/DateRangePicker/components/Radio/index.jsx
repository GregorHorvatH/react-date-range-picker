import React from 'react';

import styles from './radio.module.scss';

export const Radio = ({
  activeValue,
  disabled,
  value,
  onChange = () => {},
  ...props
}) => (
  <div
    className={`${styles.radioWrapper} ${disabled ? styles.disabled : ''}`}
    disabled={disabled}
  >
    <input
      id={value}
      checked={value === activeValue}
      className={styles.radio}
      disabled={disabled}
      type="radio"
      name="time-zone"
      value={value}
      onChange={onChange}
      {...props}
    />
    <label className={styles.label} disabled={disabled} htmlFor={value}>
      {value}
    </label>
  </div>
);
