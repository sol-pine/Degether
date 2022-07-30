import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  OPENVIDU_SERVER_SECRET,
  OPENVIDU_SERVER_URL,
  SERVER_URL,
} from "../shared/api";
import { handleError } from "../shared/commonFunction";

// 세션 생성
export const createSession = createAsyncThunk(
  "POST/createSession",
  async (projectId) => {
    const data = JSON.stringify({ customSessionId: projectId });
    return await axios
      .post(`${OPENVIDU_SERVER_URL}/openvidu/api/sessions`, data, {
        headers: {
          token: localStorage.getItem("token"),
          Authorization:
            "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("CREATE SESSION", res.data.id);
      })
      .catch((error) => handleError(error));
  }
);

// 토큰 생성
export const createViduToken = createAsyncThunk(
  "POST/createToken",
  async (projectId) => {
    return await axios
      .post(
        `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${projectId}/connection`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
            Authorization:
              "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
          },
        }
      )
      .then((res) => {
        console.log(res.data.token);
        localStorage.setItem("viduToken", res.data.token);
      })
      .catch((error) => handleError(error));
  }
);

const ViduSlice = createSlice({
  name: "ViduSlice",
  initialState: {
    viduToken: "",
  },
  reducers: {},
  extraReducers: {
    [createViduToken.fulfilled]: (state, action) => {
      state.viduToken = localStorage.getItem("viduToken");
      console.log("get token");
    },
    [createSession.fulfilled]: (state, action) => {
      console.log("session created!");
    },
  },
});
export default ViduSlice.reducer;
