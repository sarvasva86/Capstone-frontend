

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ItineraryProvider } from './contexts/ItineraryContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

ReactDOM.render(
  <React.StrictMode>
    <ItineraryProvider>
      <App />
    </ItineraryProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

