import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchItineraries } from '../api/itinerary';
import '../styles/ItineraryPage.css';

const ItineraryPage = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadItineraries = async () => {
      try {
        const data = await fetchItineraries();
        setItineraries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadItineraries();
  }, []);

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

// error handling
useEffect(() => {
  const loadItineraries = async () => {
    try {
      const data = await fetchItineraries();
      setItineraries(data);
    } catch (err) {
      setError(err.message);
      console.error('Fetch error:', err);  // Add logging
    } finally {
      setLoading(false);
    }
  };
  
  loadItineraries();
}, []);

export default ItineraryPage;
