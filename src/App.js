import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ItineraryPage from "./pages/ItineraryPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

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

// API utility function 
export const fetchItineraries = async () => {
  try {
    const response = await fetch('https://capstone-server-aa8j.onrender.com/itineraries', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch itineraries');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export default App;
