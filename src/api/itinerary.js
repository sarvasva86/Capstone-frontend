const API_BASE = process.env.REACT_APP_API_BASE;

export const fetchItineraries = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/itineraries`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(error.message || 'Failed to fetch itineraries');
  }
};
