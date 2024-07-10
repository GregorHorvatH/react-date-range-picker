import React from 'react';

import { Button } from '../Button';

import styles from './actions.module.scss';

export const Actions = ({ onApply, onCancel }) => (
  <div className={styles.actions}>
    <Button variant="light" onClick={onApply}>
      Apply
    </Button>
    <Button onClick={onCancel}>Cancel</Button>
  </div>
);
