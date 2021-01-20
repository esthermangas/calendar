import React from 'react';
import PropTypes from 'prop-types';
import styles from './monthRow.module.css';
import MonthDay from '../monthDay';
import { getDaysInWeek } from '../../utils';

const Index = (props) => {
  const { week } = props;
  const daysWeek = getDaysInWeek(week);
  return (
    <div className={styles.bodyRow}>
      {daysWeek.map((day) => (
        <MonthDay day={day} />
      ))}
    </div>
  );
};

Index.propTypes = {
  week: PropTypes.instanceOf(Date).isRequired,
};

export default Index;
