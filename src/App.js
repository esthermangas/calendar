import React from 'react';
import './App.css';
import Calendar from './Calendar';
import { MonthContextProvider } from './dateContext';

function App() {
  return (
    <MonthContextProvider>
      <div className="root">
        <Calendar />
      </div>
    </MonthContextProvider>

  );
}

export default App;
