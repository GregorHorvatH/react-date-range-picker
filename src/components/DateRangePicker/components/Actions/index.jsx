import React from 'react';

import { Button } from '../Button';

import styles from './actions.module.scss';

export const Actions = ({ theme = 'light', onApply, onCancel }) => (
  <div className={styles.actions}>
    <Button theme={theme} variant="primary" onClick={onApply}>
      Apply
    </Button>
    <Button theme={theme} variant="secondary" onClick={onCancel}>
      Cancel
    </Button>
  </div>
);
