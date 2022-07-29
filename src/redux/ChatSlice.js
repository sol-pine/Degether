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
    addChat: (state, action) => {
      state.chatList = [...state.chatList, action.payload];
      console.log(state.chatList);
    },
  },
  extraReducers: {
    [getChat.pending]: (state, action) => {
      console.log("PENDING", action.payload);
    },
    [getChat.fulfilled]: (state, action) => {
      console.log("FULFILLED", action.payload);
      state.chatList = action.payload;
      console.log(state.chatList);
    },
  },
});
export const { openChat, addChat } = ChatSlice.actions;
export default ChatSlice.reducer;
