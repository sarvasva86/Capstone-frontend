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
      // Ensure dates are properly formatted
      const payload = {
        ...formData,
        startDate: formData.startDate || new Date().toISOString(),
        endDate: formData.endDate || new Date().toISOString()
      };

      const response = await fetch(
        `${process.env.REACT_APP_API_BASE}/api/itineraries`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      // Handle non-JSON responses first
      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (!response.ok) {
        console.error('Server response error:', {
          status: response.status,
          data
        });
        throw new Error(data.error || `Server error (${response.status})`);
      }

      navigate('/itineraries', {
        state: { shouldRefresh: true }
      });

    } catch (error) {
      console.error('Full submission error:', {
        message: error.message,
        stack: error.stack
      });
      setError(error.message || 'Failed to save itinerary. Please check your data and try again.');
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
          <br />
          <small>Check console for more details</small>
        </div>
      )
