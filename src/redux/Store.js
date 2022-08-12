import { configureStore } from "@reduxjs/toolkit";
import ModalSlice from "./modules/ModalSlice";
import ProjectSlice from "./modules/ProjectSlice";
import ViduSlice from "./modules/ViduSlice";
import ChatSlice from "./modules/ChatSlice";
import UserSlice from "./modules/UserSlice";

const store = configureStore({
  reducer: {
    Modal: ModalSlice,
    Project: ProjectSlice,
    Vidu: ViduSlice,
    Chat: ChatSlice,
    User: UserSlice,
  },
});

export default store;
