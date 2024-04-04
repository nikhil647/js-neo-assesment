import { createSlice } from "@reduxjs/toolkit";

//Action+Reducer for Widget Data
export const widgetSlice = createSlice({
  name: "widget",
  initialState: { flag: false, widgetdata: null, mode: "" },
  reducers: {
    visible: (state, action) => {
      state.flag = action.payload.flag;
      state.widgetdata = action.payload.widgetdata;
      state.mode = action.payload.mode;
    },
  },
});

// Action creators are generated for each case reducer function
export const { visible } = widgetSlice.actions;

export default widgetSlice.reducer;
