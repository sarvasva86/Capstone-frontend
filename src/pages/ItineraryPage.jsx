import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { fetchItineraries } from '../api/itinerary';
import '../styles/ItineraryPage.css';
import { useItinerary } from '../contexts/ItineraryContext';

const ItineraryPage = () => {
  const [itineraries, setItineraries] = useState([]); // ✅ Ensuring initial state is an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { data, loading: contextLoading, error: contextError, fetchItineraries } = useItinerary();

  const loadItineraries = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required. Please login again.');
      }

      const fetchedData = await fetchItineraries();
      setItineraries(Array.isArray(fetchedData) ? fetchedData : []);

      // ✅ Reset refresh state
      if (location.state?.shouldRefresh) {
        navigate(location.pathname, { replace: true, state: {} });
      }
    } catch (err) {
      console.error('Error fetching itineraries:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItineraries();
  }, [location.state?.shouldRefresh]); // ✅ Refresh after itinerary is saved

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

  if (loading || contextLoading) { // ✅ Now using contextLoading
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your travel plans...</p>
      </div>
    );
  }

  if (error || contextError) { // ✅ Now using contextError
    return (
      <div className="error-container">
        <h2>⚠️ Connection Issue</h2>
        <p>{error || contextError}</p>
        <button 
          onClick={() => loadItineraries()} // ✅ Retry fetch
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
        {/* ✅ Ensuring that itineraries is an array before using .length */}
        {Array.isArray(itineraries) && itineraries.length > 0 ? (
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
                {/* ✅ Ensuring activities is an array before mapping */}
                {(Array.isArray(itinerary.activities) ? itinerary.activities : []).map((activity, index) => (
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
