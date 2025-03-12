import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useItinerary } from "../contexts/ItineraryContext";
import "../styles/ItineraryPage.css";

const ItineraryPage = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { fetchItineraries } = useItinerary();

  const loadItineraries = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required. Please log in again.");
      }

      const fetchedData = await fetchItineraries();
      setItineraries(Array.isArray(fetchedData) ? fetchedData : []);

      // ✅ Reset refresh state after saving
      if (location.state?.shouldRefresh) {
        navigate(location.pathname, { replace: true, state: {} });
      }
    } catch (err) {
      console.error("Error fetching itineraries:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItineraries();
  }, [location.state?.shouldRefresh]); // ✅ Triggers refresh after saving an itinerary

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
        <button onClick={loadItineraries} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="itinerary-page">
      <div className="header-section">
        <h1>My Travel Plans</h1>
        <Link to="/create-itinerary" className="create-button">
          ＋ New Itinerary
        </Link>
      </div>

      <div className="itinerary-list">
        {itineraries.length > 0 ? (
          itineraries.map((itinerary) => (
            <div key={itinerary._id} className="itinerary-card">
              <h3>{itinerary.title || "Untitled Itinerary"}</h3>
              <p>{itinerary.description}</p>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No adventures planned yet!</p>
            <Link to="/create-itinerary" className="create-button">
              Plan Your First Trip
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryPage;
