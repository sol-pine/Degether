import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../shared/api";

// 마이페이지 정보 받아오기
export const getUserInfo = createAsyncThunk("GET/getUserInfo", async () => {
  return await axios
    .get(`${SERVER_URL}/user/userInfo`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((response) => {
      return response.data.result;
    })
    .catch((error) => console.error(error));
});
// 마이페이지 유저 정보 편집
export const editUser = createAsyncThunk("PUT/editUser", async (formData) => {
  const res = await axios
    .put(`${SERVER_URL}/user/userEdit`, formData, {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log("editUser", response.data);
      alert("프로필 정보가 변경되었습니다.");
    })
    .catch((error) => console.error(error));
});

const UserSlice = createSlice({
  name: "ProjectSlice",
  initialState: {
    userInfo: {},
  },
  reducers: {},
  extraReducers: {
    [getUserInfo.fulfilled]: (state, action) => {
      state.userInfo = { ...action.payload };
    },
    [editUser.fulfilled]: (state, action) => {
      state.userInfo = { ...action.payload };
    },
  },
});
export default UserSlice.reducer;
