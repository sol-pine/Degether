import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../shared/api";
import { handleError } from "../shared/commonFunction";

// 프로젝트 생성하기
export const addProject = createAsyncThunk(
  "ADD/addProject",
  async (formData) => {
    return await axios
      .post(`${SERVER_URL}/api/project`, formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response.data.ok;
      })
      .catch((error) => handleError(error));
  }
);

// 프로젝트 리스트 받아오기
export const getProject = createAsyncThunk("GET/getProject", async (args) => {
  const token = localStorage.getItem("token");
  return await axios
    .get(`${SERVER_URL}/api/projects?`, {
      params: {
        search: args.searchWord ? args.searchWord : null,
        language: args.language ? args.language : null,
        genre: args.genre ? args.genre : null,
        sorted: args.sorted,
        page: args.page ? Number(args.page) : 0,
      },
      headers: {
        Authorization: token ? token : null,
      },
    })
    .then((response) => response.data.result)
    .catch((error) => handleError(error));
});

// 프로젝트 리스트 무한스크롤
export const getProjectPage = createAsyncThunk(
  "GET/getProjectPage",
  async (args) => {
    const token = localStorage.getItem("token");
    return await axios
      .get(`${SERVER_URL}/api/projects?`, {
        params: {
          search: args.searchWord ? args.searchWord : null,
          language: args.language ? args.language : null,
          genre: args.genre ? args.genre : null,
          sorted: args.sorted,
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
// 프로젝트 상세 보기
export const getProjectDetails = createAsyncThunk(
  "GET/getProjectDetails",
  async (projectId) => {
    return await axios
      .get(`${SERVER_URL}/api/project/${projectId}`)
      .then((res) => res.data.result)
      .catch((error) => console.error(error.message));
  }
);
// 프로젝트 찜하기
export const interestedProject = createAsyncThunk(
  "POST/interestedProject",
  async (projectId) => {
    const res = await axios
      .post(
        `${SERVER_URL}/api/projectZzim/${projectId}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => alert("관심 프로젝트로 등록되었습니다."))
      .catch((error) => handleError(error));
    return res.data;
  }
);

// 프로젝트 지원하기
export const applyProject = createAsyncThunk(
  "POST/applyProject",
  async (projectId) => {
    const res = await axios
      .post(
        `${SERVER_URL}/api/projectApply/${projectId}`,
        {},
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      )
      .then((res) => alert("프로젝트 지원이 완료되었습니다."))
      .catch((error) => handleError(error));
    return res.data;
  }
);
// 프로젝트 수정하기
export const editProject = createAsyncThunk("PUT/editProject", async (args) => {
  const res = await axios
    .put(`${SERVER_URL}/api/project/${args.projectId}`, args.formData, {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log("Edit ", res.data);
      alert("프로젝트 수정이 완료되었습니다.");
    })
    .catch((error) => handleError(error));
});
const ProjectSlice = createSlice({
  name: "ProjectSlice",
  initialState: {
    searchButton: false,
    createModal: false,
    order: "",
    type: "",
    searchWord: "",
    language: "",
    image: null,
    list: [],
    file: {},
    project: [],
    myProject: [],
    detail: {},
  },
  reducers: {
    openSearchButton: (state, action) => {
      state.searchButton = action.payload;
    },
    openCreateModal: (state, action) => {
      state.createModal = action.payload;
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
    uploadImage: (state, action) => {
      state.image = action.payload;
    },
  },
  extraReducers: {
    [addProject.fulfilled]: (state, action) => {
      if (action.payload) {
        window.location.href = "/";
      } else {
        console.log("false");
      }
    },
    [getProject.fulfilled]: (state, action) => {
      state.list = [...action.payload.list];
    },
    [getProjectPage.fulfilled]: (state, action) => {
      state.list = [...state.list, ...action.payload];
    },
    [getProjectDetails.fulfilled]: (state, action) => {
      state.detail = { ...action.payload };
      state.projectDetailModal = true;
    },
    [interestedProject.fulfilled]: (state, action) => {
      console.log("zzim!");
      window.location.reload();
    },
    [applyProject.fulfilled]: (state, action) => {
      console.log("apply!");
      window.location.reload();
    },
    [editProject.fulfilled]: (state, action) => {
      window.location.reload();
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
  uploadImage,
} = ProjectSlice.actions;
export default ProjectSlice.reducer;
