import React from "react";
import ReactDOM from "react-dom/client"; 
import App from "./App";
import { ItineraryProvider } from "./contexts/ItineraryContext";

const root = ReactDOM.createRoot(document.getElementById("root")); 
root.render(
  <React.StrictMode>
    <ItineraryProvider>
      <App />
    </ItineraryProvider>
  </React.StrictMode>
);
