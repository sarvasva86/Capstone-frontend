import { createContext, useContext, useState, useEffect } from "react";

const ItineraryContext = createContext(); // ✅ Create Context

export const useItinerary = () => {
  const context = useContext(ItineraryContext);
  if (!context) {
    throw new Error("useItinerary must be used within ItineraryProvider");
  }
  return context;
};

export const ItineraryProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchItineraries = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Unauthorized: No token found. Please log in.");
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/itineraries`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Session expired. Please log in again.");
        }
        throw new Error("Failed to fetch itineraries.");
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItineraries();
  }, []);

  return (
    <ItineraryContext.Provider value={{ data, loading, error, fetchItineraries }}>
      {children}
    </ItineraryContext.Provider>
  );
};
