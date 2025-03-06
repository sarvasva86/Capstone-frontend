import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ItineraryPage from './pages/ItineraryPage'; 
import NotFound from './pages/NotFound';
import { useEffect, useState } from 'react'; // Add this

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/itineraries" element={<ItineraryPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

// Updated API utility function with correct endpoint
export const fetchItineraries = async () => {
  try {
    const response = await fetch('https://capstone-server-aa8j.onrender.com/api/itineraries', {
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
