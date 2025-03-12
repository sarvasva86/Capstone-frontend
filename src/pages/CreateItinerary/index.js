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
      // Validate input
      if (!formData.title?.trim()) {
        throw new Error("Title is required");
      }

      // Prepare payload
      const payload = {
        title: formData.title.trim(),
        activities: formData.activities.filter(a => a?.trim()),
        startDate: formData.startDate || new Date().toISOString(),
        endDate: formData.endDate || new Date().toISOString(),
      };

      // API call
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE}/api/itineraries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(payload)
        }
      );

      // Handle response
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.error || `Server error: ${response.status}`);
      }

      // Successful creation
      navigate("/itineraries", { 
        state: { 
          shouldRefresh: true,
          newItinerary: responseData
        } 
      });

    } catch (error) {
      console.error("Submission error:", error);
      setError(error.message);
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
          <small>Check console for details</small>
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
