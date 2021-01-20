import React, { useEffect } from 'react';
import { Icon, Text } from 'esther-components';
import { format, addMonths, subMonths } from 'date-fns';
import Select from 'react-select';
import styles from './index.module.css';
import { getWeeks, getMonthsInYears } from '../utils';
import MonthRow from './monthRow';
import monthsActions from '../dateContext/types';
import { useMonthContext } from '../dateContext';
import useComponentVisible from '../hooks';
import Modal from '../Components/Modal';

const Calendar = () => {
  const { state, dispatch } = useMonthContext();
  const weeks = getWeeks(state.month);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    const monthValue = state.month.getMonth();
    const yearValue = state.month.getFullYear();
    if (state.refresh) {
      fetch(`http://localhost:3001/events?month=${monthValue}&year=${yearValue}`, {
        headers: {
          'content-type': 'application/json',
        },
        mode: 'cors',
      }).then((res) => res.json()).then((res) => {
        dispatch({ type: monthsActions.MONTH__EVENTS, payload: res });
      });
    }
  }, [state.month, state.refresh]);

  const {
    ref: refSelect,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible();
  const handleChangeAddMonth = () => {
    const addMonth = addMonths(state.month, 1);
    dispatch({
      type: monthsActions.MONTH__ADD_MONTH,
      payload: { month: addMonth },
    });
  };
  const handleChangeSubMonth = () => {
    const subMonth = subMonths(state.month, 1);
    dispatch({
      type: monthsActions.MONTH__SUB_MONTH,
      payload: { month: subMonth },
    });
  };
  const handleOpenSelect = () => {
    setIsComponentVisible(true);
  };

  const dates = getMonthsInYears();

  const handleNewDate = (data) => {
    dispatch({
      type: monthsActions.MONTH__SET_MONTH,
      payload: { month: data.value },
    });
    setIsComponentVisible(false);
  };
  return (
    <div className={styles.root}>
      <Modal open={state.modal} />
      <div className={styles.preContainer}>
        <div className={styles.monthName}>
          <div className={styles.icon} onClick={handleChangeSubMonth}>
            <span>
              <Icon name="chevronLeft" color="cadetBlue" size="36px" />
            </span>
          </div>
          {!isComponentVisible
                    && (
                    <div onClick={handleOpenSelect} className={styles.titleMonth}>
                      <Text tagHtml="h2" align="center">{format(state.month, 'MMMM yyyy')}</Text>
                    </div>
                    )}
          {isComponentVisible && (
            <div ref={refSelect} className={styles.select}>
              <Select
                options={dates}
                onChange={handleNewDate}
                value={{ value: state.month, label: format(state.month, 'MMMM yyyy') }}
              />
            </div>
          )}
          <div className={styles.icon} onClick={handleChangeAddMonth}>
            <span>
              <Icon name="chevronRight" color="cadetBlue" size="36px" />
            </span>
          </div>
        </div>
        <div className={styles.container}>
          {days.map((d) => (
            <div className={styles.dayHeader}>
              {d}
            </div>
          ))}
        </div>
        <div className={styles.body}>
          {weeks.map((week) => (
            <MonthRow week={week} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
