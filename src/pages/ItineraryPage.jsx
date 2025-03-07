import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { fetchItineraries } from '../api/itinerary';
import '../styles/ItineraryPage.css';

const ItineraryPage = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loadItineraries = async () => {
      try {
        const data = await fetchItineraries();
        setItineraries(data);
        
        if (location.state?.shouldRefresh) {
          navigate(location.pathname, { replace: true, state: {} });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadItineraries();
  }, [location.state?.shouldRefresh]);

  if (loading) return <div className="loading">Loading itineraries...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="itinerary-page">
      <div className="header-section">
        <h1>My Travel Itineraries</h1>
        <Link to="/create-itinerary" className="create-button">
          ＋ Create New Itinerary
        </Link>
      </div>

      <div className="itinerary-list">
        {itineraries.length > 0 ? (
          itineraries.map(itinerary => (
            <div key={itinerary._id} className="itinerary-card">
              <h3>{itinerary.title}</h3>
              <div className="date-range">
                {new Date(itinerary.startDate).toLocaleDateString()} - 
                {new Date(itinerary.endDate).toLocaleDateString()}
              </div>
              <div className="activities">
                {itinerary.activities.map((activity, index) => (
                  <span key={index} className="activity-tag">
                    {activity}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No itineraries found. Let's plan your next adventure!</p>
            <Link to="/create-itinerary" className="create-button">
              Create Your First Itinerary
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

// Only ONE export default statement
export default ItineraryPage;
