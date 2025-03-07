
const API_BASE = process.env.REACT_APP_API_BASE;
if (!API_BASE) {
  throw new Error('REACT_APP_API_BASE environment variable is missing');
}

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
