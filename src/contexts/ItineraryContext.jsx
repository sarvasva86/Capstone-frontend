import React, { createContext, useReducer, useContext } from 'react';
import axiosClient from '../api/client'; // Your axios instance

// 1. Create Context
const ItineraryContext = createContext();

// 2. Define Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { 
        ...state, 
        loading: false,
        data: action.payload.data,
        pagination: action.payload.pagination
      };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

// 3. Create Provider Component
export const ItineraryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    loading: true,
    error: null,
    pagination: {}
  });

  const fetchItineraries = async (page = 1) => {
    try {
      dispatch({ type: 'FETCH_START' });
      const response = await axiosClient.get(`/itineraries?page=${page}`);
      dispatch({ 
        type: 'FETCH_SUCCESS', 
        payload: {
          data: response.data.items,
          pagination: response.data.pagination
        }
      });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  };

  return (
    <ItineraryContext.Provider value={{ ...state, fetchItineraries }}>
      {children}
    </ItineraryContext.Provider>
  );
};

// 4. Create Custom Hook
export const useItinerary = () => {
  const context = useContext(ItineraryContext);
  if (!context) {
    throw new Error('useItinerary must be used within ItineraryProvider');
  }
  return context;
};
