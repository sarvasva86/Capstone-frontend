import React, { useEffect, useState } from 'react';
import { fetchItineraries } from '../App';
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
      <h1>My Travel Itineraries</h1>
      
      <div className="itinerary-list">
        {itineraries.length > 0 ? (
          itineraries.map(itinerary => (
            <div key={itinerary._id} className="itinerary-card">
              <h3>{itinerary.title}</h3>
              <p>{new Date(itinerary.date).toLocaleDateString()}</p>
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
          <p>No itineraries found. Start by creating one!</p>
        )}
      </div>
    </div>
  );
};

export default ItineraryPage;
