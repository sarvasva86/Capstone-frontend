const API_BASE = process.env.REACT_APP_API_BASE;

export const fetchItineraries = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE}/api/itineraries`);
    
    if (!response.ok) throw new Error('Failed to fetch');
    
    const data = await response.json();
    
    // Convert ISO date strings to Date objects
    return data.map(it => ({
      ...it,
      startDate: new Date(it.startDate),
      endDate: new Date(it.endDate),
      createdAt: new Date(it.createdAt)
    }));
    
  } catch (error) {
    throw new Error(error.message);
  }
};
