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

export const parseDateRange = (dateRangeStr) => {
  if (!dateRangeStr || typeof dateRangeStr !== 'string') {
    return {
      date1: undefined,
      date2: undefined,
      period1: undefined,
      period2: undefined,
      formattedDate1: undefined,
      formattedDate2: undefined,
    };
  }

  // Define a regular expression to match the date range pattern
  const dateRangePattern =
    /^(\d{2})\/(\d{2})\/(\d{4}) (\d{1,2}):(\d{2}) (AM|PM) - (\d{2})\/(\d{2})\/(\d{4}) (\d{1,2}):(\d{2}) (AM|PM)$/;

  // Test the date range string against the pattern
  const match = dateRangeStr.toUpperCase().match(dateRangePattern);

  if (!match) {
    throw new Error('Invalid date range format');
  }

  // Extract the components from the match result
  const [
    originalDateString,
    day1,
    month1,
    year1,
    hour1,
    minute1,
    period1,
    day2,
    month2,
    year2,
    hour2,
    minute2,
    period2,
  ] = match;

  const hour1_24 = convertTo24HourFormat(hour1, period1);
  const hour2_24 = convertTo24HourFormat(hour2, period2);

  // Create Date objects for both dates
  let date1 = new Date(year1, month1 - 1, day1, hour1_24, minute1);
  let date2 = new Date(year2, month2 - 1, day2, hour2_24, minute2);

  // swap the dates if the first is greater than the second
  if (date1.getTime() > date2.getTime()) {
    [date2, date1] = [date1, date2];
  }

  const formattedDate1 = formatDate(date1);
  const formattedDate2 = formatDate(date2);

  return {
    date1,
    date2,
    period1,
    period2,
    formattedDate1,
    formattedDate2,
  };
};

export const getFormattedDate = (from, to) =>
  from && to ? `${formatDate(from)} - ${formatDate(to)}` : undefined;

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
