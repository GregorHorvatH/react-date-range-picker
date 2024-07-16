import React from 'react';

import { Dropdown } from '../Dropdown';
import { useCalendarData } from '../../hooks';
import { HOURS, MINUTES, PERIOD } from '../../constants';

import { ReactComponent as ArrowRightIcon } from '../../assets/arrow-right.svg';
import { ReactComponent as ArrowLeftIcon } from '../../assets/arrow-left.svg';
import { ReactComponent as CalendarIcon } from '../../assets/calendar.svg';
import { ReactComponent as ClockIcon } from '../../assets/clock.svg';

import styles from './calendar.module.scss';

export const Calendar = ({ name = '' }) => {
  const {
    actualModule,
    inputValue,
    year,
    month,
    day,
    hours,
    minutes,
    period,
    onHideList,
    onToggleList,
    onInputChange,
    onHoursChange,
    onMinutesChange,
    onPeriodChange,
  } = useCalendarData({ name });

  return (
    <div className={styles.calendar}>
      <div className={styles.inputWrapper}>
        <CalendarIcon className={styles.calendarIcon} />
        <input
          className={styles.calendarInput}
          type="text"
          value={inputValue}
          onChange={onInputChange}
        />
      </div>
      <div className={styles.dropdowns}>
        <ClockIcon className={styles.clockIcon} />
        <Dropdown
          items={HOURS}
          isOpen={actualModule === `${name}-hours`}
          name={`${name}-hours`}
          value={hours}
          onChange={onHoursChange}
          onHide={onHideList}
          onToggle={() => onToggleList({ actualModule, name: `${name}-hours` })}
        />
        <span>:</span>
        <Dropdown
          items={MINUTES}
          isOpen={actualModule === `${name}-minutes`}
          name={`${name}-minutes`}
          value={minutes}
          onChange={onMinutesChange}
          onHide={onHideList}
          onToggle={() =>
            onToggleList({ actualModule, name: `${name}-minutes` })
          }
        />
        <Dropdown
          items={PERIOD}
          isOpen={actualModule === `${name}-period`}
          name={`${name}-period`}
          value={period}
          onChange={onPeriodChange}
          onHide={onHideList}
          onToggle={() =>
            onToggleList({ actualModule, name: `${name}-period` })
          }
        />
      </div>
      <table>
        <thead>
          <tr>
            <th className={styles.th} colSpan={7}>
              <div className={styles.headerWrapper}>
                <ArrowLeftIcon className={styles.arrowIcon} />
                <span className={styles.header}>July 2024</span>
                <ArrowRightIcon className={styles.arrowIcon} />
              </div>
            </th>
          </tr>
          <tr>
            <th className={styles.th}>Mo</th>
            <th className={styles.th}>Tu</th>
            <th className={styles.th}>We</th>
            <th className={styles.th}>Th</th>
            <th className={styles.th}>Fr</th>
            <th className={styles.th}>Sa</th>
            <th className={styles.th}>Su</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.td}>01</td>
            <td className={styles.td}>02</td>
            <td className={styles.td}>03</td>
            <td className={styles.td}>04</td>
            <td className={styles.td}>05</td>
            <td className={styles.td}>06</td>
            <td className={styles.td}>07</td>
          </tr>
          <tr>
            <td className={styles.td}>08</td>
            <td className={styles.td}>09</td>
            <td className={styles.td}>10</td>
            <td className={styles.td}>11</td>
            <td className={styles.td}>12</td>
            <td className={styles.td}>13</td>
            <td className={styles.td}>14</td>
          </tr>
          <tr>
            <td className={styles.td}>15</td>
            <td className={styles.td}>16</td>
            <td className={styles.td}>17</td>
            <td className={styles.td}>18</td>
            <td className={styles.td}>19</td>
            <td className={styles.td}>20</td>
            <td className={styles.td}>21</td>
          </tr>
          <tr>
            <td className={styles.td}>22</td>
            <td className={styles.td}>23</td>
            <td className={styles.td}>24</td>
            <td className={styles.td}>25</td>
            <td className={styles.td}>26</td>
            <td className={styles.td}>27</td>
            <td className={styles.td}>28</td>
          </tr>
          <tr>
            <td className={styles.td}>29</td>
            <td className={styles.td}>30</td>
            <td className={styles.td}>31</td>
            <td className={styles.td}>1</td>
            <td className={styles.td}>2</td>
            <td className={styles.td}>3</td>
            <td className={styles.td}>4</td>
          </tr>
          <tr>
            <td className={styles.td}>5</td>
            <td className={styles.td}>6</td>
            <td className={styles.td}>7</td>
            <td className={styles.td}>8</td>
            <td className={styles.td}>9</td>
            <td className={styles.td}>10</td>
            <td className={styles.td}>11</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
