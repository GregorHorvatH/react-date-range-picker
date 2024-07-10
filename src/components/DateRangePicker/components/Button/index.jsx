import React from 'react';

import styles from './button.module.scss';

/**
 * Button component
 * @param {string} variant - dark, light
 */
export const Button = ({ children, variant = 'dark', ...props }) => {
  return (
    <button className={`${styles.button} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
};
