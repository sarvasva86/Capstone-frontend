import { createContext, useContext } from "react";

const ItineraryContext = createContext();

export const useItinerary = () => {
  const context = useContext(ItineraryContext);
  if (!context) {
    throw new Error("useItinerary must be used within ItineraryProvider");
  }
  return context;
};

export const fetchItineraries = async () => {
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

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
