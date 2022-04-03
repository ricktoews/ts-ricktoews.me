import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './global';
import { theme } from './theme';
import { Routes, Route } from 'react-router-dom';
import Masthead from './components/masthead/Masthead';
import Calendar from './components/calendar/Calendar';
import './App.css';

function App() {
  const handleYearClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('Clicked');
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
      <Masthead />
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/denom" element={<div>Denom</div>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
