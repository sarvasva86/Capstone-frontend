import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useItinerary } from "../contexts/ItineraryContext";
import "../styles/ItineraryPage.css";

const ItineraryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: itineraries, loading, error, fetchItineraries } = useItinerary();
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetchItineraries();
  }, [location.state?.shouldRefresh]);

  useEffect(() => {
    if (itineraries.length > 0) {
      fetchTravelSuggestions();
    }
  }, [itineraries]);

  const fetchTravelSuggestions = async () => {
    const destination = itineraries[0]?.title || "Beach";
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/suggestions?destination=${destination}`);
      const data = await response.json();
      setSuggestions(data.suggestions || []);
    } catch (err) {
      console.error("Error fetching travel suggestions:", err);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown Date";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return <div className="loading-container"><p>Loading your travel plans...</p></div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>⚠️ Connection Issue</h2>
        <p>{error}</p>
        <button onClick={fetchItineraries} className="retry-button">Retry</button>
      </div>
    );
  }

  return (
    <div className="itinerary-page">
      <div className="header-section">
        <h1>🌍 My Travel Plans</h1>
        <Link to="/create-itinerary" className="create-button">＋ New Itinerary</Link>
      </div>

      <div className="itinerary-list">
        {itineraries.length > 0 ? (
          itineraries.map((itinerary) => (
            <div key={itinerary._id} className="itinerary-card">
              <h3>{itinerary.title || "🌍 Untitled Itinerary"}</h3>
              <p>{itinerary.description || "📌 No description available."}</p>
              <div className="date-range">
                {formatDate(itinerary.startDate)} - {formatDate(itinerary.endDate)}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No adventures planned yet!</p>
            <Link to="/create-itinerary" className="create-button">Plan Your First Trip</Link>
          </div>
        )}
      </div>

      <div className="suggestions-section">
        <h2>🌟 AI Travel Suggestions</h2>
        {suggestions.length > 0 ? (
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index} className="suggestion-item">{suggestion}</li>
            ))}
          </ul>
        ) : (
          <p>No suggestions available right now. Please add your itinerary first!</p>
        )}
      </div>
    </div>
  );
};

export default ItineraryPage;
