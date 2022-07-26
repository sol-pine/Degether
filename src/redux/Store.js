import { configureStore } from "@reduxjs/toolkit";
import ProjectSlice from "./ProjectSlice";
import UserSlice from "./UserSlice";
import ViduSlice from "./ViduSlice";

const store = configureStore({
  reducer: {
    Project: ProjectSlice,
    User: UserSlice,
    Vidu: ViduSlice,
  },
});

export default store;
