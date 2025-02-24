import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // Import CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Virtual Travel Planner</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/itinerary">Itineraries</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;


