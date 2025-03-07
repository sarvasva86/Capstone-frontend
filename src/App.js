import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ItineraryPage from './pages/ItineraryPage'; 
import NotFound from './pages/NotFound';
import { useEffect, useState } from 'react'; 
import CreateItinerary from './pages/CreateItinerary';
import { fetchItineraries } from './api/itinerary';



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
        <Route path="/create-itinerary" element={<CreateItinerary />} />
        <Route path="/create" element={<CreateItinerary />} />
      </Routes>
    </Router>
  );
}
export default App; // Default export
