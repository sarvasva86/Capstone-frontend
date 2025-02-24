import { configureStore } from "@reduxjs/toolkit";
import itineraryReducer from "./itinerarySlice";

const store = configureStore({
  reducer: {
    itinerary: itineraryReducer,
  },
});

export default store;
