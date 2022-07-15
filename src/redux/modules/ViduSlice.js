import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import { OPENVIDU_SERVER_URL, OPENVIDU_SERVER_SECRET } from "../../shared/api";

// 세션 생성
export const createSession = createAsyncThunk(
  "POST/createSession",
  async (projectId) => {
    const data = JSON.stringify({ customSessionId: projectId });
    return await axios
      .post(`${OPENVIDU_SERVER_URL}/openvidu/api/sessions`, data, {
        headers: {
          Authorization:
            "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("CREATE SESION", res.data.id);
      })
      .catch((e) => console.log(e));
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
            Authorization:
              "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
          },
        }
      )
      .then((res) => {
        console.log(res.data.token);
        localStorage.setItem("viduToken", res.data.token);
      });
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
    },
  },
});
export default ViduSlice.reducer;
