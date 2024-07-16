import { CALENDAR, RANGE_ITEMS } from '../constants';

// Return the date params separately
export const getDateParams = (date) => {
  if (!date) return;

  const year = String(date.getFullYear());
  const month = String(date.getMonth());
  const day = String(date.getDate());
  let hours = date.getHours();
  const minutes = String(date.getMinutes());
  const period = hours > 12 ? 'PM' : 'AM';

  hours = String(period === 'PM' ? hours - 12 : hours);

  return { year, month, day, hours, minutes, period };
};

// Convert 12-hour format to 24-hour format if needed
export const convertTo24HourFormat = (hour, period) => {
  hour = parseInt(hour, 10);
  if (period === 'PM' && hour !== 12) {
    hour += 12;
  } else if (period === 'AM' && hour === 12) {
    hour = 0;
  }

  return hour;
};

// Format the dates in the desired format
export const formatDate = (date) => {
  if (!date) return;

  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const yyyy = date.getFullYear();
  let hh = date.getHours();
  const min = String(date.getMinutes()).padStart(2, '0');
  let p = 'AM';

  if (hh >= 12) {
    p = 'PM';
    hh = hh > 12 ? hh - 12 : hh;
  } else if (hh === 0) {
    hh = 12;
  }

  hh = String(hh).padStart(2, '0');

  return `${dd}/${mm}/${yyyy} ${hh}:${min} ${p}`;
};

export const formatDateRange = ({ fromDate, toDate }) =>
  fromDate && toDate
    ? `${formatDate(fromDate)} - ${formatDate(toDate)}`
    : undefined;

export const createDateString = ({
  year,
  month,
  day,
  hours,
  minutes,
  period,
}) => {
  const formattedMonth = String(parseInt(month) + 1).padStart(2, 0);
  const formattedDay = day.padStart(2, 0);
  const formattedHours = hours.padStart(2, 0);
  const formattedMinutes = minutes.padStart(2, 0);

  return `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes} ${period}`;
};

export const parseDate = (dateStr) => {
  // Define a regular expression to match the date range pattern
  const datePattern = /^(\d{2})\/(\d{2})\/(\d{4}) (\d{1,2}):(\d{2}) (AM|PM)$/;

  if (!dateStr || typeof dateStr !== 'string') {
    return {
      date: undefined,
      period: undefined,
      formattedDate: undefined,
    };
  }

  // Test the date range string against the pattern
  const match = dateStr.toUpperCase().match(datePattern);

  if (!match) {
    throw new Error('Invalid date format');
  }

  // Extract the components from the match result
  const [originalDateString, day, month, year, hour, minute, period] = match;
  const hour1_24 = convertTo24HourFormat(hour, period);
  const date = new Date(year, month - 1, day, hour1_24, minute);
  const formattedDate = formatDate(date);

  return {
    date,
    period,
    formattedDate,
  };
};

export const parseDateRange = (dateRangeStr) => {
  if (!dateRangeStr || typeof dateRangeStr !== 'string') {
    return {
      date1: undefined,
      date2: undefined,
      period1: undefined,
      period2: undefined,
      formattedDate1: undefined,
      formattedDate2: undefined,
      formattedDateRange: undefined,
    };
  }

  // Define a regular expression to match the date range pattern
  const dateRangePattern =
    /(\d{2}\/\d{2}\/\d{4} \d{2}:\d{2} [APM]{2}) - (\d{2}\/\d{2}\/\d{4} \d{2}:\d{2} [APM]{2})/;

  // Test the date range string against the pattern
  const match = dateRangeStr.toUpperCase().match(dateRangePattern);

  if (!match) {
    throw new Error('Invalid date range format');
  }

  // Extract the components from the match result
  const [originalDateString, date1Str, date2Str] = match;

  // Parse the date strings to date objects
  const {
    date: date1,
    period: period1,
    formattedDate: formattedDate1,
  } = parseDate(date1Str);
  const {
    date: date2,
    period: period2,
    formattedDate: formattedDate2,
  } = parseDate(date2Str);
  const formattedDateRange = `${formattedDate1} - ${formattedDate2}`;

  return {
    date1,
    date2,
    period1,
    period2,
    formattedDate1,
    formattedDate2,
    formattedDateRange,
  };
};

export const secToMillis = (sec) => sec * 1000;
export const minToMillis = (min) => secToMillis(min * 60);
export const hourToMillis = (hour) => minToMillis(hour * 60);
export const dayToMillis = (day) => hourToMillis(day * 24);

export const localToUtc = (date = new Date()) =>
  new Date(date.toUTCString().slice(0, -4));

export const utcToLocal = (date = new Date()) =>
  new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )
  );

export const getDatesFromRange = (items, range) => {
  const toDate = new Date();
  const fromDate = new Date(
    toDate.getTime() - items.find((item) => item.value === range).range
  );

  return formatDateRange({ fromDate, toDate });
};

export const getDateStrFromRangeStr = (name, nextDateRangeInputStr) => {
  const { formattedDate1, formattedDate2 } = parseDateRange(
    nextDateRangeInputStr
  );

  return name === CALENDAR.first ? formattedDate1 : formattedDate2;
};

export const getFormattedRangeStr = ({
  name,
  nextDateRangeInputStr,
  formattedDate,
}) => {
  const { formattedDate1, formattedDate2 } = parseDateRange(
    nextDateRangeInputStr
  );

  return name === CALENDAR.first
    ? `${formattedDate} - ${formattedDate2}`
    : `${formattedDate1} - ${formattedDate}`;
};
