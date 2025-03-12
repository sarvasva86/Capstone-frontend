
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
      const token = localStorage.getItem("token"); // ✅ Retrieve auth token
      if (!token) {
        throw new Error("Unauthorized: Please log in first.");
      }

      const payload = {
        ...formData,
        startDate: formData.startDate || new Date().toISOString(),
        endDate: formData.endDate || new Date().toISOString(),
      };

      const response = await fetch(
        `${process.env.REACT_APP_API_BASE}/api/itineraries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ Send auth token
          },
          body: JSON.stringify(payload),
        }
      );

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (!response.ok) {
        console.error("Server response:", { status: response.status, data });
        throw new Error(data.error || `Server error (${response.status})`);
      }

      console.log("Itinerary successfully created:", data);
      
      // ✅ Navigate & trigger refresh after successful save
      navigate("/itineraries", { state: { shouldRefresh: true } });

    } catch (error) {
      console.error("Submission error:", error);
      setError(error.message || "Failed to create itinerary. Please try again.");
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
