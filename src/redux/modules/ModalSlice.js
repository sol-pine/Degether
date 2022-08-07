import { createSlice } from "@reduxjs/toolkit";

const ModalSlice = createSlice({
  name: "ModalSlice",
  initialState: {
    create: false,
  },
  reducers: {
    letsCreate: (state, action) => {
      state.create = action.payload;
    },
  },
  extraReducers: {},
});
export const { letsCreate } = ModalSlice.actions;
export default ModalSlice.reducer;
