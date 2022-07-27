import { configureStore } from "@reduxjs/toolkit";
import ChatSlice from "./ChatSlice";
import ProjectSlice from "./ProjectSlice";
import UserSlice from "./UserSlice";
import ViduSlice from "./ViduSlice";

const store = configureStore({
  reducer: {
    Project: ProjectSlice,
    User: UserSlice,
    Vidu: ViduSlice,
    Chat: ChatSlice,
  },
});

export default store;
