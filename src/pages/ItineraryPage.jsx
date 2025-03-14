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
  }, [location.state?.shouldRefresh]);

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown Date";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
              <img src={`https://source.unsplash.com/600x400/?travel,${itinerary.title}`} alt="Itinerary" />
              <div className="itinerary-details">
                <h3>{itinerary.title || "🌍 Untitled Itinerary"}</h3>
                <p>{itinerary.description || "📌 No description available."}</p>
                <div className="date-range">
                  {formatDate(itinerary.startDate)} - {formatDate(itinerary.endDate)}
                </div>
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
    </div>
  );
};

export default ItineraryPage;
