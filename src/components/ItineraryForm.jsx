import React, { useState } from "react";

const ItineraryForm = ({ addItinerary }) => {
  const [destination, setDestination] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (destination.trim()) {
      addItinerary(destination);
      setDestination("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default ItineraryForm;
