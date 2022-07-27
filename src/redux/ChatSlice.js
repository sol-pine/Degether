import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../shared/api";

export const getChat = createAsyncThunk("GET/getChat", async (myProjectId) => {
  return await axios
    .get(`${SERVER_URL}/chat/message/${myProjectId}`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
});

const ChatSlice = createSlice({
  name: "ChatSlice",
  initialState: {
    projectChat: false,
    chatList: [{}],
  },
  reducers: {
    openChat: (state, action) => {
      state.projectChat = action.payload;
    },
  },
  extraReducers: {
    [getChat.fulfilled]: (state, action) => {
      state.chatList = [...action.payload];
    },
  },
});
export const { openChat } = ChatSlice.actions;
export default ChatSlice.reducer;
