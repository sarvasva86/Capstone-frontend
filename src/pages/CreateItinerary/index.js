import React from 'react';
import { useNavigate } from 'react-router-dom';
import ItineraryForm from '../../components/ItineraryForm';

const CreateItinerary = () => {
  const navigate = useNavigate();

  const handleSubmit = async (itineraryData) => {
    try {
      const response = await fetch('/api/itineraries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itineraryData),
      });
      
      if (response.ok) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error creating itinerary:', error);
    }
  };

  return (
    <div className="create-itinerary">
      <h2>Create New Itinerary</h2>
      <ItineraryForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateItinerary;
