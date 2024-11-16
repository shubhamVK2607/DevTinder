import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestSlice";
import feedReducer from "./feedSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    connection: connectionReducer,
    request: requestReducer,
    feed: feedReducer,
  },
});
