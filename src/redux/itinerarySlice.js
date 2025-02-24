import { createSlice } from "@reduxjs/toolkit";

const itinerarySlice = createSlice({
  name: "itinerary",
  initialState: {
    itineraries: [],
  },
  reducers: {
    addItinerary: (state, action) => {
      state.itineraries.push(action.payload);
    },
    removeItinerary: (state, action) => {
      state.itineraries = state.itineraries.filter((itinerary) => itinerary.id !== action.payload);
    },
  },
});

export const { addItinerary, removeItinerary } = itinerarySlice.actions;
export default itinerarySlice.reducer;
