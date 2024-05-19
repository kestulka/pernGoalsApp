import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/authSlice";
import goalsReducer from "../Features/goalsSlice";
import usersReducer from "../Features/usersSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalsReducer,
    users: usersReducer,
  },
});

export default store;
