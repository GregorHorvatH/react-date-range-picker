import React from 'react';

import { DateRangePickerFull, DateRangePickerShort } from './components';

import './dateRangePicker.module.scss';

/**
 * Date Range Picker
 *
 * input format: DD/MM/YYYY HH:MM P
 * input example: 09/07/2024 01:18 AM - 09/07/2024 08:18 PM
 *
 * theme: light | dark
 */
export const DateRangePicker = ({
  short = false,
  theme = 'light',
  onChange = () => {},
}) => {
  return short ? (
    <DateRangePickerShort theme={theme} onChange={onChange} />
  ) : (
    <DateRangePickerFull theme={theme} onChange={onChange} />
  );
};
