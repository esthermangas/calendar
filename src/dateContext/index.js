import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import useMonthReducer from './reducer';

const MonthContext = createContext();

export const MonthContextProvider = ({ children }) => {
  const [state, dispatch] = useMonthReducer();
  return (
    <MonthContext.Provider value={{ state, dispatch }}>
      {children}
    </MonthContext.Provider>
  );
};

MonthContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useMonthContext = () => {
  const { state, dispatch } = useContext(MonthContext);

  return {
    state,
    dispatch,
  };
};
