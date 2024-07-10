import React from 'react';

import styles from './backDrop.module.scss';

export const BackDrop = ({ onClick }) => (
  <div className={styles.backDrop} onClick={onClick} />
);
