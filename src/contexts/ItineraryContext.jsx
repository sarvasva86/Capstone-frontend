import { createContext, useContext, useState, useEffect } from "react";

const ItineraryContext = createContext();

export const useItinerary = () => {
  const context = useContext(ItineraryContext);
  if (!context) {
    throw new Error("useItinerary must be used within ItineraryProvider");
  }
  return context;
};

export const ItineraryProvider = ({ children }) => {
  const [state, setState] = useState({
    data: [],
    loading: false,
    error: null,
    lastFetched: null
  });

  const handleError = (error) => {
    console.error("Itinerary Context Error:", error);
    setState(prev => ({
      ...prev,
      error: error.message,
      loading: false
    }));
    
    // Auto-logout on 401 Unauthorized
    if (error.message.includes("401")) {
      localStorage.removeItem("token");
      window.location.href = "/login?session_expired=true";
    }
  };

  const fetchItineraries = async (forceRefresh = false) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const token = localStorage.getItem("token");
      if (!token) throw new Error("401 - Authentication required");

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/itineraries`, 
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "X-Request-ID": crypto.randomUUID() 
          },
          cache: forceRefresh ? "reload" : "default"
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP ${response.status} - ${response.statusText}`
        );
      }

      const result = await response.json();
      
      setState({
        data: result,
        loading: false,
        error: null,
        lastFetched: new Date().toISOString()
      });

    } catch (err) {
      handleError(err);
    }
  };

  // Add automatic refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (state.lastFetched) {
        const minutesSinceLastFetch = 
          (new Date() - new Date(state.lastFetched)) / 60000;
        if (minutesSinceLastFetch > 5) {
          fetchItineraries(true);
        }
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [state.lastFetched]);

  // Initial fetch
  useEffect(() => {
    fetchItineraries();
  }, []);

  return (
    <ItineraryContext.Provider value={{
      ...state,
      fetchItineraries,
      retry: () => fetchItineraries(true)
    }}>
      {children}
    </ItineraryContext.Provider>
  );
};
