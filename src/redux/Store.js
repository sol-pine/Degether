import { configureStore } from "@reduxjs/toolkit";
import ProjectSlice from "./ProjectSlice";

const store = configureStore({
  reducer: {
    Project: ProjectSlice,
  },
});

export default store;
