import { configureStore } from "@reduxjs/toolkit";
import ProjectSlice from "../redux/modules/ProjectSlice";
import UserSlice from "../redux/modules/UserSlice";
import ViduSlice from "../redux/modules/ViduSlice";
const store = configureStore({
  reducer: {
    Project: ProjectSlice,
    User: UserSlice,
    Vidu: ViduSlice,
  },
});

export default store;
