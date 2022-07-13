import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import { OPENVIDU_SERVER_URL, OPENVIDU_SERVER_SECRET } from "../../shared/api";

//   비두 토큰 생성
const sessionId = "SessionB";
export const createViduToken = createAsyncThunk(
  "CREATE/createToken",
  async () => {
    const res = await axios
      .post(
        `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionId}/connection`,
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
