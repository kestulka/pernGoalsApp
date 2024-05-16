import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/authSlice";
import goalsReducer from "../Features/goalsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalsReducer,
  },
});

export default store;
