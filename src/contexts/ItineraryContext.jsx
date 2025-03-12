import { createContext, useContext, useState, useEffect } from "react";

const ItineraryContext = createContext(); // ✅ Create Context

// 🚀 Custom Hook to Use Itinerary Context
export const useItinerary = () => {
  const context = useContext(ItineraryContext);
  if (!context) {
    throw new Error("useItinerary must be used within ItineraryProvider");
  }
  return context;
};

// ✅ ItineraryProvider Component
export const ItineraryProvider = ({ children }) => {
  const [data, setData] = useState([]); // Stores itineraries
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 📌 Fetch Itineraries Function
  const fetchItineraries = async () => {
  setLoading(true);
  try {
    const token = localStorage.getItem("token"); // ✅ Retrieve token from localStorage
    if (!token) {
      throw new Error("Unauthorized: Please log in.");
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/itineraries`, {
      headers: { Authorization: `Bearer ${token}` }, // ✅ Include token in request
    });

    if (!response.ok) {
      throw new Error("Failed to fetch itineraries. Please log in again.");
    }

    const result = await response.json();
    setData(result);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  // 📌 Auto-fetch itineraries on mount
  useEffect(() => {
    fetchItineraries();
  }, []);

  return (
    <ItineraryContext.Provider value={{ data, loading, error, fetchItineraries }}>
      {children}
    </ItineraryContext.Provider>
  );
};
