import React from 'react';

import styles from './button.module.scss';

/**
 * Button component
 * @param {string} variant - dark, light
 */
export const Button = ({
  children,
  variant = 'primary',
  theme = 'light',
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${styles[theme]} ${styles[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};
