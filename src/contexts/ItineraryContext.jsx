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
  const [data, setData] = useState([]); // ✅ Ensures an array as default
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Fetch Itineraries with error handling & logging
  const fetchItineraries = async () => {
    setLoading(true);
    setError(null); // ✅ Reset error before fetching

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Unauthorized: No token found. Please log in.");
      }

      console.log("Fetching itineraries..."); // ✅ Debugging log

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
      console.log("Fetched itineraries:", result); // ✅ Debugging log

      setData(Array.isArray(result) ? result : []); // ✅ Prevents errors when mapping

    } catch (err) {
      console.error("Fetch error:", err.message); // ✅ Log error
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
