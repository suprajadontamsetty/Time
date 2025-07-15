
import { createRoot } from 'react-dom/client'
import React from 'react';

import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { TimerProvider } from './context/TimerContext';


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <ThemeProvider>       
      <TimerProvider>
        <App />
      </TimerProvider>
    </ThemeProvider>
  </BrowserRouter>
)
