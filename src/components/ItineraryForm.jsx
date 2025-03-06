import React, { useState } from 'react';

const ItineraryForm = ({ onSubmit, initialData = {}, isSubmitting }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    activities: initialData.activities || [''],
  });

  const handleActivityChange = (index, value) => {
    const newActivities = [...formData.activities];
    newActivities[index] = value;
    setFormData(prev => ({ ...prev, activities: newActivities }));
  };

  const addActivity = () => {
    setFormData(prev => ({ 
      ...prev, 
      activities: [...prev.activities, ''] 
    }));
  };

  const removeActivity = (index) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      activities: formData.activities.filter(activity => activity.trim() !== '')
    });
  };

  return (
    <form onSubmit={handleSubmit} className="itinerary-form">
      <div className="form-group">
        <label>Title *</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          required
          disabled={isSubmitting}
        />
      </div>
      
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          disabled={isSubmitting}
        />
      </div>

      <div className="form-group activities-group">
        <label>Activities *</label>
        {formData.activities.map((activity, index) => (
          <div key={index} className="activity-input">
            <input
              type="text"
              value={activity}
              onChange={(e) => handleActivityChange(index, e.target.value)}
              required
              disabled={isSubmitting}
            />
            {formData.activities.length > 1 && (
              <button
                type="button"
                onClick={() => removeActivity(index)}
                disabled={isSubmitting}
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addActivity}
          disabled={isSubmitting}
          className="add-activity"
        >
          + Add Activity
        </button>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="submit-button"
      >
        {isSubmitting ? 'Submitting...' : 'Save Itinerary'}
      </button>
    </form>
  );
};

export default ItineraryForm;
