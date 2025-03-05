import React from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";

const Home = () => {
  return (
    <div className="fade-in">
      <section className="home-hero">
        <h1>Explore the World with Confidence</h1>
        <p>Your perfect travel experience starts here. Plan, organize, and enjoy seamless trips with real-time updates and smart recommendations.</p>
        
        <Link to="/signup" className="cta-button">
          Start Planning Now →
        </Link>
      </section>

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
