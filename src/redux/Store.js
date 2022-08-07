import { configureStore } from "@reduxjs/toolkit";
import ModalSlice from "./modules/ModalSlice";
import ProjectSlice from "./modules/ProjectSlice";

const store = configureStore({
  reducer: {
    Modal: ModalSlice,
    Project: ProjectSlice,
  },
});

export default store;
