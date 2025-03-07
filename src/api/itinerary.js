export const fetchItineraries = async () => {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE}/api/itineraries`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      // Handle specific HTTP errors
      if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.reload(); // Force re-authentication
      }
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(error.message || 'Failed to connect to server');
  }
};
