import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { fetchItineraries } from '../api/itinerary';
import '../styles/ItineraryPage.css';

const ItineraryPage = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const loadItineraries = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchItineraries();
      setItineraries(data);
      
      // Clear refresh state if coming from creation
      if (location.state?.shouldRefresh) {
        navigate(location.pathname, { replace: true, state: {} });
      }
    } catch (err) {
      console.error('Fetch error details:', {
        message: err.message,
        stack: err.stack
      });
      setError(err.message);
      
      // Auto-retry logic (3 attempts)
      if (retryCount < 3) {
        setTimeout(() => setRetryCount(c => c + 1), 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItineraries();
  }, [retryCount, location.state?.shouldRefresh]);

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Invalid date';
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your travel plans...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>⚠️ Connection Issue</h2>
        <p>{error}</p>
        <button 
          onClick={() => setRetryCount(0)}
          className="retry-button"
        >
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
              <h3>{itinerary.title || 'Untitled Itinerary'}</h3>
              
              <div className="date-range">
                {formatDate(itinerary.startDate)} – {formatDate(itinerary.endDate)}
              </div>

              {itinerary.description && (
                <p className="description">{itinerary.description}</p>
              )}

              <div className="activities-container">
                {(itinerary.activities || []).map((activity, index) => (
                  <span key={index} className="activity-tag">
                    {activity || 'Unknown Activity'}
                  </span>
                ))}
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
