
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useItinerary } from '../contexts/ItineraryContext';
import '../styles/ItineraryPage.css';

const ItineraryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, loading, error, fetchItineraries } = useItinerary();

  // Handle refresh after creation/update
  React.useEffect(() => {
    if (location.state?.shouldRefresh) {
      fetchItineraries();
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]);

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
          onClick={fetchItineraries}
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
        {data.length > 0 ? (
          data.map((itinerary) => (
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
