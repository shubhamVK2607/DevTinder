import { createSlice } from "@reduxjs/toolkit";

export const connctionSlice = createSlice({
  name: "connection",
  initialState: null,
  reducers: {
    addConnections: (state, action) => {
      return action.payload;
    },
    removeConnections: () => {
      return null;
    },
  },
});

export const { addConnections, removeConnections } = connctionSlice.actions;

export default connctionSlice.reducer;
