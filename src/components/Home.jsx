import React from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";
import Navbar from './Navbar';

const Home = () => {
  return (
    <div className="fade-in">
      <Navbar />
      {/* Hero Section with Background Image */}
      <section 
        className="home-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), url('https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')`
        }}
      >
        <div className="hero-content">
          <h1>Explore the World with Confidence</h1>
          <p className="hero-subtitle">Your perfect travel experience starts here. Plan, organize, and enjoy seamless trips with real-time updates and smart recommendations.</p>
          <Link to="/signup" className="cta-button">
            Start Planning Now →
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-grid">
        <div className="feature-card fade-in">
          <div className="feature-icon">🗺️</div>
          <h3>Smart Itineraries</h3>
          <p>Create and manage dynamic travel plans that adapt to your preferences</p>
        </div>

        <div className="feature-card fade-in">
          <div className="feature-icon">⏱️</div>
          <h3>Real-time Updates</h3>
          <p>Get live weather, flight status, and local event notifications</p>
        </div>

        <div className="feature-card fade-in">
          <div className="feature-icon">📌</div>
          <h3>Collaborative Planning</h3>
          <p>Share and edit plans with travel companions in real-time</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
