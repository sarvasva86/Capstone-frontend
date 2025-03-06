import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ItineraryForm from '../../components/ItineraryForm';

const CreateItinerary = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (itineraryData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Clean up activities array
      const cleanedActivities = itineraryData.activities
        .map(activity => activity.trim())
        .filter(activity => activity !== '');

      const response = await fetch('/api/itineraries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...itineraryData,
          activities: cleanedActivities
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create itinerary');
      }

      navigate('/');
    } catch (error) {
      console.error('Submission error:', error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-itinerary">
      <h2>Create New Itinerary</h2>
      {error && <div className="error-message">{error}</div>}
      <ItineraryForm 
        onSubmit={handleSubmit} 
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
