import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ItineraryForm from '../../components/ItineraryForm';

const CreateItinerary = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/itineraries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // Handle network errors
      if (!response) {
        throw new Error('Network error - no response from server');
      }

      // Handle non-JSON responses
      const contentType = response.headers.get('content-type');
      const isJson = contentType?.includes('application/json');

      const data = isJson ? await response.json() : null;

      if (!response.ok) {
        throw new Error(data?.error || `HTTP error! status: ${response.status}`);
      }

      navigate('/');
    } catch (error) {
      console.error('Submission failed:', error);
      setError(error.message || 'Failed to create itinerary. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <h1>Create New Itinerary</h1>
      
      {error && (
        <div className="error-alert">
          ⚠️ {error}
        </div>
      )}

      <ItineraryForm 
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default CreateItinerary;
