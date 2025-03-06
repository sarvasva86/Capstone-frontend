import React, { useState } from 'react';

const ItineraryForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    activities: initialData.activities || [''],
  });

  const handleActivityChange = (index, value) => {
    const newActivities = [...formData.activities];
    newActivities[index] = value;
    setFormData({ ...formData, activities: newActivities });
  };

  const addActivity = () => {
    setFormData({ ...formData, activities: [...formData.activities, ''] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Description:</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Activities:</label>
        {formData.activities.map((activity, index) => (
          <input
            key={index}
            type="text"
            value={activity}
            onChange={(e) => handleActivityChange(index, e.target.value)}
            required
          />
        ))}
        <button type="button" onClick={addActivity}>
          Add Activity
        </button>
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ItineraryForm;
