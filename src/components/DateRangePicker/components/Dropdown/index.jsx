import React, { useContext, useEffect, useState } from 'react';

import { BackDrop } from '../BackDrop';
import { ReactComponent as ArrowDownIcon } from '../../assets/arrow-down.svg';
import { ReactComponent as CheckIcon } from '../../assets/check.svg';

import styles from './dropdown.module.scss';

export const DROPDOWN_VARIANTS = {
  default: 'default',
  text: 'text',
};

/**
 * theme: light | dark
 */
export const Dropdown = ({
  className,
  items = [],
  isOpen = false,
  name = '',
  value = '',
  variant = DROPDOWN_VARIANTS.default,
  theme = 'light',
  withShadow = false,
  onChange = () => {},
  onHide = () => {},
  onToggle = () => {},
}) => {
  useEffect(() => {
    if (isOpen && value) {
      document.querySelector(`[data-id="${name}-${value}"]`).scrollIntoView();
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && <BackDrop onClick={onHide} />}
      <div
        className={`${styles.dropdown} ${styles[theme]} ${styles[variant]} ${className}`}
        onClick={onToggle}
      >
        <span>{value}</span>
        <ArrowDownIcon className={styles.arrowIcon} />
        {isOpen && (
          <div
            className={`${styles.list} ${styles[theme]} ${
              withShadow ? styles.shadow : ''
            }`}
          >
            {items.map((item) => {
              const isActive = value === item;

              return (
                <div
                  className={`${styles.listItem} ${
                    isActive ? styles.active : ''
                  }`}
                  data-id={`${name}-${item}`}
                  key={item}
                  onClick={() => onChange(item)}
                >
                  {variant === DROPDOWN_VARIANTS.text && (
                    <span className={styles.check}>
                      {isActive && <CheckIcon className={styles.checkIcon} />}
                    </span>
                  )}
                  <span>{item}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
