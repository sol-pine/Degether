import { configureStore } from "@reduxjs/toolkit";
import ModalSlice from "./modules/ModalSlice";
import ProjectSlice from "./modules/ProjectSlice";
import ViduSlice from "./modules/ViduSlice";
import ChatSlice from "./modules/ChatSlice";

const store = configureStore({
  reducer: {
    Modal: ModalSlice,
    Project: ProjectSlice,
    Vidu: ViduSlice,
    Chat: ChatSlice,
  },
});

export default store;
