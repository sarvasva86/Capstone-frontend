import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useItinerary } from "../contexts/ItineraryContext";
import "../styles/ItineraryPage.css";

const ItineraryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: itineraries, loading, error, fetchItineraries } = useItinerary();

  useEffect(() => {
    fetchItineraries();
  }, [location.state?.shouldRefresh]); // ✅ Refresh after saving

  // ✅ Handle itinerary deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this itinerary?")) {
      try {
        const token = localStorage.getItem("token");
        await fetch(`${process.env.REACT_APP_API_URL}/api/itineraries/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchItineraries(); // ✅ Refresh after delete
      } catch (error) {
        console.error("Delete error:", error);
        alert("Failed to delete itinerary.");
      }
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
        <Link to="/create-itinerary" className="create-button">
          ＋ New Itinerary
        </Link>
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
