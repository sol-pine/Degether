import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {SERVER_URL} from "../../shared/api";
import {handleError} from "../../utils/handleError";

export const getChat = createAsyncThunk("GET/getChat", async (myProjectId) => {
    return await axios
        .get(`${SERVER_URL}/chat/message/${myProjectId}`)
        .then((response) => response.data)
        .catch((error) => handleError(error));
});

const ChatSlice = createSlice({
    name: "ChatSlice",
    initialState: {
        projectChat: false,
        chatList: [],
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
        [getChat.fulfilled]: (state, action) => state.chatList = action.payload.reverse()
    }
});
export const {openChat, addChat} = ChatSlice.actions;
export default ChatSlice.reducer;
