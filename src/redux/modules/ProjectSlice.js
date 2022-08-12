import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../../shared/api";
import { handleError } from "../../shared/handleError";

// 프로젝트 리스트 받아오기
export const getProject = createAsyncThunk("GET/getProject", async (args) => {
  const token = sessionStorage.getItem("token");
  return await axios
    .get(`${SERVER_URL}/api/projects?`, {
      params: {
        search: args.searchWord ? args.searchWord : null,
        sorted: args.order ? args.order : "createdDate",
        page: args.page ? Number(args.page) : 0,
      },
      headers: {
        Authorization: token ? token : null,
      },
    })
    .then((res) => res.data.result.list)
    .catch((error) => handleError(error));
});

// 프로젝트 리스트 무한스크롤
export const getProjectPage = createAsyncThunk(
  "GET/getProjectPage",
  async (args) => {
    const token = sessionStorage.getItem("token");
    return await axios
      .get(`${SERVER_URL}/api/projects?`, {
        params: {
          page: args.page ? Number(args.page) : 0,
        },
        headers: {
          Authorization: token ? token : null,
        },
      })
      .then((res) => res.data.result.list)
      .catch((error) => handleError(error));
  }
);

const ProjectSlice = createSlice({
  name: "ProjectSlice",
  initialState: {
    list: [],
  },
  reducers: {},
  extraReducers: {
    [getProject.fulfilled]: (state, action) => {
      state.list = [...action.payload];
    },
    [getProjectPage.fulfilled]: (state, action) => {
      state.list = [...state.list, ...action.payload];
    },
  },
});
export default ProjectSlice.reducer;
