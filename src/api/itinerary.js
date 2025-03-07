
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export const fetchItineraries = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/itineraries`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch itineraries');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(error.message || 'Network connection failed');
  }
};
