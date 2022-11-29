import { createSlice } from "@reduxjs/toolkit";

const ModalSlice = createSlice({
  name: "ModalSlice",
  initialState: {
    create: false,
  },
  reducers: {
    setCreate: (state, action) => {
      state.create = action.payload;
    },
  },
  extraReducers: {},
});
export const { setCreate } = ModalSlice.actions;
export default ModalSlice.reducer;
