import React from "react";

const DestinationCard = ({ destination }) => {
  return (
    <div className="destination-card">
      <h3>{destination.name}</h3>
      <p>Weather: {destination.weather.condition} ({destination.weather.temperature}°C)</p>
      <p>Attractions: {destination.attractions.join(", ")}</p>
    </div>
  );
};

export default DestinationCard;
