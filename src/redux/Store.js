import { configureStore } from "@reduxjs/toolkit";
import ProjectSlice from "./ProjectSlice";
import UserSlice from "./UserSlice";

const store = configureStore({
  reducer: {
    Project: ProjectSlice,
    User: UserSlice,
  },
});

export default store;
