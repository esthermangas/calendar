import {
  startOfMonth, endOfMonth, eachWeekOfInterval, addDays, eachDayOfInterval, eachMonthOfInterval, format,
} from 'date-fns';

export const getWeeks = (date) => {
  const firtsDayMonth = startOfMonth(date);
  const lastDayMonth = endOfMonth(date);
  const weeks = eachWeekOfInterval({
    start: firtsDayMonth,
    end: lastDayMonth,
  }, {
    weekStartsOn: 1,
  });
  return weeks;
};

export const getDaysInWeek = (date) => {
  const lastDayWeek = addDays(date, 6);
  const daysOfWeek = eachDayOfInterval({
    start: date,
    end: lastDayWeek,
  });
  return daysOfWeek;
};

export const getMonthsInYears = () => {
  const minYear = new Date('01-01-1970');
  const maxYear = new Date('01-12-2040');
  const monthsOfYears = eachMonthOfInterval(
    {
      start: minYear,
      end: maxYear,
    },
  );
  return monthsOfYears.map((month) => ({ value: month, label: format(month, 'MMMM yyyy') }));
};
