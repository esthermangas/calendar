import { useReducer } from 'react';
import monthAction from './types';

const initialState = {
  month: new Date(),
  events: [],
  filteredEvents: [],
  modal: false,
  day: undefined,
  refresh: true,
};

const monthReducer = (state, action) => {
  const newState = { ...state };
  switch (action.type) {
    case monthAction.MONTH__SET_MONTH:
      newState.month = action.payload.month;
      newState.refresh = true;
      return newState;
    case monthAction.MONTH__ADD_MONTH:
      newState.month = action.payload.month;
      newState.refresh = true;
      return newState;
    case monthAction.MONTH__SUB_MONTH:
      newState.month = action.payload.month;
      newState.refresh = true;
      return newState;
    case monthAction.MONTH__EVENTS:
      newState.events = action.payload;
      newState.refresh = false;
      return newState;
    case monthAction.MONTH__OPEN_MODAL:
      newState.modal = true;
      newState.filteredEvents = action.payload.events;
      newState.day = action.payload.day;
      return newState;
    case monthAction.MONTH__CLOSE_MODAL:
      newState.modal = false;
      newState.refresh = true;
      return newState;
    default:
      return state;
  }
};

export default () => useReducer(monthReducer, initialState);
