import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { fetchItineraries } from '../api/itinerary';
import '../styles/ItineraryPage.css';
import { useItinerary } from '../contexts/ItineraryContext';

const ItineraryPage = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const location = useLocation();
  const navigate = use Navigate();
  const { data, loading, error, fetchItineraries } = useItinerary();
  

  const loadItineraries = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Verify authentication state
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required. Please login again.');
      }

      const data = await fetchItineraries();
      setItineraries(data);
      
      // Clear refresh state
      if (location.state?.shouldRefresh) {
        navigate(location.pathname, { replace: true, state: {} });
      }
    } catch (err) {
      console.error('Error details:', {
        message: err.message,
        code: err.code,
        stack: err.stack
      });
      
      // Enhanced error messages
      const friendlyError = err.message.includes('Failed to fetch') 
        ? 'Connection to server failed. Check your internet connection.'
        : err.message;
      
      setError(friendlyError);
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
    fetchItineraries(1); // Initial load
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <div>
      {data.map(itinerary => (
        <ItineraryCard key={itinerary._id} {...itinerary} />
      ))}
    </div>
  );
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
