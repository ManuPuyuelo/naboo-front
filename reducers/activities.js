import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const activitiesSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    setActivities: (state, action) => {
      state.value = action.payload;
    },
    createActivity: (state, action) => {
      state.value.push(action.payload);
    },
    deleteActivity: (state, action) => {
      state.value = state.value.filter((e) => e._id !== action.payload);
    },
  },
});

export const { setActivities, createActivity, deleteActivity } =
  activitiesSlice.actions;
export default activitiesSlice.reducer;
