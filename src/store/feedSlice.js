import { createSlice } from "@reduxjs/toolkit";

export const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addSuggestions: (state, action) => {
      return action.payload;
    },
    removeSuggestion: (state, action) => {
      const newFeed = state.filter((feed) => feed._id !== action.payload);
      return newFeed;
    },
  },
});

export const { addSuggestions, removeSuggestion } = feedSlice.actions;

export default feedSlice.reducer;
