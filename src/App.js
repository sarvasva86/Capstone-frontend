import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ItineraryPage from "./pages/ItineraryPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Home from './components/Home';
import Signup from './components/Signup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/itinerary" element={<ItineraryPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
// Example fetch call with error handling
export const fetchItineraries = async () => {
  try {
    const response = await fetch('https://capstone-server-aa8j.onrender.com/itineraries', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Add token if required
      }
    });
    if (!response.ok) throw new Error('Failed to fetch itineraries');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error; // Propagate error to component
  }
};
