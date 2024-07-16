import { useState } from 'react';

import { DateRangePicker } from './components/DateRangePicker';

import styles from './app.module.css';

export const App = () => {
  const [isDark, setIsDark] = useState(false);
  const [isShort, setIsShort] = useState(false);
  const theme = isDark ? 'dark' : 'light';

  const toggleTheme = () => setIsDark((prev) => !prev);
  const toggleShort = () => setIsShort((prev) => !prev);

  const onDateRangeChange = (item) => {
    console.log('item:', item);
  };

  return (
    <div className={`${styles.app} ${styles[theme]}`}>
      <label className={styles.toggler}>
        <input type="checkbox" checked={isDark} onChange={toggleTheme} />
        <span>dark theme</span>
      </label>
      <label className={styles.toggler}>
        <input type="checkbox" checked={isShort} onChange={toggleShort} />
        <span>short variant</span>
      </label>

      <div className={`${styles.datePicker} ${isShort ? styles.flex : ''}`}>
        <DateRangePicker
          onChange={onDateRangeChange}
          theme={theme}
          short={isShort}
        />
      </div>
      <p>lorem ipsum</p>
    </div>
  );
};
