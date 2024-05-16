import { createSlice } from "@reduxjs/toolkit";

export const goalsSlice = createSlice({
  name: "goals",
  initialState: {
    goals: [],
  },
  reducers: {
    setGoals: (state, action) => {
      state.goals = action.payload;
    },
  },
});

export const { setGoals } = goalsSlice.actions;

export default goalsSlice.reducer;
