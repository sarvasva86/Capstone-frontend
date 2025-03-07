
const API_BASE = import.meta.env.VITE_API_BASE || 'https://your-backend-url.onrender.com';

export const fetchItineraries = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/itineraries`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch data');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(error.message || 'Network connection failed');
  }
};
