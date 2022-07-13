import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../../shared/api";

const UserSlice = createSlice({
  name: "ProjectSlice",
  initialState: {
    loginModal: true,
  },
  reducers: {
    loginModal: (state, action) => {
      console.log("login is true!");
      state.loginModal = action.payload;
    },
  },
  extraReducers: {},
});
export const { loginModal, isLogin } = UserSlice.actions;
export default UserSlice.reducer;
