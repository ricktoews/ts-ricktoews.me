import React from 'react';
import Calendar from './components/calendar/Calendar';
import './App.css';

function App() {
  const handleYearClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('Clicked');
  }

  return (
    <div className="App">
      <Calendar />
    </div>
  );
}

export default App;
