import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../shared/api";

// 프로젝트 리스트 받아오기
export const getProject = createAsyncThunk("GET/getProject", async (args) => {
  return await axios
    .get(`${SERVER_URL}/api/projects?`, {
      params: {
        search: args.searchWord ? args.searchWord : null,
        language: args.language ? args.language : null,
        genre: args.genre ? args.genre : null,
        sorted: args.sorted,
        page: args.page ? Number(args.page) : 0,
      },
    })
    .then((respose) => respose.data.result)
    .catch((error) => console.error(error));
});

// 프로젝트 리스트 무한스크롤
export const getProjectPage = createAsyncThunk(
  "GET/getProjectPage",
  async (args) => {
    return await axios
      .get(`${SERVER_URL}/api/projects?`, {
        params: {
          search: args.searchWord ? args.searchWord : null,
          language: args.language ? args.language : null,
          genre: args.genre ? args.genre : null,
          sorted: args.sorted,
          page: args.page ? Number(args.page) : 0,
        },
      })
      .then((res) => res.data.result.list)
      .catch((e) => console.err(e));
  }
);

const ProjectSlice = createSlice({
  name: "ProjectSlice",
  initialState: {
    searchButton: false,

    order: "",
    type: "",
    searchWord: "",
    language: "",

    projectCreateModal: false,
    projectDetailModal: false,
    list: [],
    file: {},
    project: [],
    myProject: [],
    detail: {},
  },
  reducers: {
    openSearchButton: (state, action) => {
      state.searchButton = action.payload;
      console.log(state.searchTab);
    },
    openCreateModal: (state, action) => {
      state.projectCreateModal = action.payload;
    },
    openDetailModal: (state, action) => {
      state.projectDetailModal = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setSearchWord: (state, action) => {
      state.searchWord = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
  extraReducers: {
    [getProject.fulfilled]: (state, action) => {
      state.list = [...action.payload.list];
    },
    [getProjectPage.fulfilled]: (state, action) => {
      state.list = [...state.list, ...action.payload];
    },
  },
});
export const {
  openSearchButton,
  openCreateModal,
  openDetailModal,
  addPage,
  setOrder,
  setType,
  setLanguage,
  setSearchWord,
} = ProjectSlice.actions;
export default ProjectSlice.reducer;
