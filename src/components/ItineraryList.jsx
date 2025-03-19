import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ItineraryList.css"; // Import CSS file

const ItineraryList = () => {
  const [itineraries, setItineraries] = useState([]);

  useEffect(() => {
    const fetchItineraries = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/itineraries`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItineraries(response.data);
    };
    fetchItineraries();
  }, []);


  {itineraries.map((itinerary) => (
  <div key={itinerary._id} className="itinerary-card">
    <h3>{itinerary.title}</h3>
    <button onClick={() => handleEdit(itinerary._id)}>✏️ Edit</button>  // ✅ Edit button
  </div>
))}


   return (
    <div className="itinerary-container">
      <h2>Your Itineraries</h2>
      <ul className="itinerary-list">
        {itineraries.map((itinerary) => (
          <li key={itinerary._id} className="itinerary-item">
            {itinerary.destinations.join(", ")} ({itinerary.startDate} - {itinerary.endDate})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItineraryList;
