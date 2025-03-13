import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useItinerary } from "../contexts/ItineraryContext";
import "../styles/ItineraryPage.css";

const ItineraryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: itineraries, loading, error, fetchItineraries, deleteItinerary } = useItinerary();
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetchItineraries();
  }, [location.state?.shouldRefresh]); // ✅ Refresh after saving

  useEffect(() => {
    if (itineraries.length > 0) {
      fetchTravelSuggestions();
    }
  }, [itineraries]);

  const fetchTravelSuggestions = async () => {
    const destination = itineraries[0]?.title || "Beach"; // Placeholder logic, we can customize this
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/suggestions?destination=${destination}`);
      const data = await response.json();
      setSuggestions(data.suggestions || []);
    } catch (err) {
      console.error("Error fetching travel suggestions:", err);
    }
  };

  // ✅ Handle itinerary deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this itinerary?")) {
      await deleteItinerary(id);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading your travel plans...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>⚠️ Connection Issue</h2>
        <p>{error}</p>
        <button onClick={fetchItineraries} className="retry-button">
          Retry
        </button>
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
              <img src={`https://source.unsplash.com/600x400/?travel,${itinerary.title}`} alt="Itinerary" />
              <div className="itinerary-details">
                <h3>{itinerary.title || "Untitled Itinerary"}</h3>
                <p>{itinerary.description || "No description available."}</p>
                <div className="date-range">{itinerary.startDate} - {itinerary.endDate}</div>
                <div className="buttons">
                  <button className="delete-btn" onClick={() => handleDelete(itinerary._id)}>🗑 Delete</button>
                </div>
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
