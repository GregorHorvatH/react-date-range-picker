import { DateRangePicker } from './components/DateRangePicker';

import styles from './app.module.css';

export const App = () => (
  <div className={styles.app}>
    <div className={styles.datePicker}>
      <DateRangePicker />
    </div>
    <p>lorem ipsum</p>
  </div>
);
