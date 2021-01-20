import React from 'react';
import PropTypes from 'prop-types';
import { format, isSameDay } from 'date-fns';
import styles from './monthDay.module.css';
import { useMonthContext } from '../../dateContext';
import monthActions from '../../dateContext/types';

const MonthDay = (props) => {
  const { state, dispatch } = useMonthContext();
  const { day } = props;
  const dayStyles = {};
  if (day.getMonth() === state.month.getMonth()) {
    dayStyles.backgroundColor = '#e3f3ff';
  } else {
    dayStyles.backgroundColor = '#f1f6f8';
  }
  const actualDay = isSameDay(day, new Date());
  const events = state.events.filter((ev) => ev.day === day.getDate() && ev.month === day.getMonth());
  const handleOpenModal = () => {
    dispatch({ type: monthActions.MONTH__OPEN_MODAL, payload: { events, day } });
  };
  return (
    <div className={styles.bodyDay} style={dayStyles} onClick={handleOpenModal}>
      {actualDay
            && (
            <span className={styles.numberBall}>
              {format(day, 'dd')}
            </span>
            )}
      {!actualDay && (format(day, 'dd'))}
      {events.length > 0 && (
        <div className={styles.eventBall}>
          {events.length}
        </div>
      )}
    </div>
  );
};

MonthDay.propTypes = {
  day: PropTypes.instanceOf(Date).isRequired,
};

export default MonthDay;
