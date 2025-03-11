

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ItineraryProvider } from './contexts/ItineraryContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ItineraryProvider> {/* ✅ Wrap your app inside the provider */}
      <App />
    </ItineraryProvider>
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

