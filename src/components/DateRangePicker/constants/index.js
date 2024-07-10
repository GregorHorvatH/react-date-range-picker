import { minToMillis, hourToMillis, dayToMillis } from '../utils';

export const RANGE = {
  m1: '1 Minute',
  m15: '15 Minutes',
  h1: '1 Hour',
  h6: '6 Hours',
  h12: '12 Hours',
  h24: '24 Hours',
  d2: '2 Days',
  d7: '7 Days',
  d30: '30 Days',
  custom: 'Custom',
};

export const RANGE_ITEMS = [
  { value: RANGE.m1, range: minToMillis(1) },
  { value: RANGE.m15, range: minToMillis(15) },
  { value: RANGE.h1, range: hourToMillis(1) },
  { value: RANGE.h6, range: hourToMillis(6) },
  { value: RANGE.h12, range: hourToMillis(12) },
  { value: RANGE.h24, range: hourToMillis(24) },
  { value: RANGE.d2, range: dayToMillis(2) },
  { value: RANGE.d7, range: dayToMillis(7) },
  { value: RANGE.d30, range: dayToMillis(30) },
  { value: RANGE.custom },
];

export const TIME_ZONE = {
  utc: 'UCT',
  local: 'Local',
};

export const TIME_ZONES = Object.entries(TIME_ZONE);
