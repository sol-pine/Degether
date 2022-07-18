import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../../shared/api";

const token = localStorage.getItem("token");

// 프로젝트 생성하기
export const addProject = createAsyncThunk(
  "ADD/addProject",
  async (formData) => {
    const res = await axios.post(`${SERVER_URL}/api/project`, formData, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res.data);
  }
);

// 프로젝트 리스트 처음 받아오기
export const getProject = createAsyncThunk("GET/getProject", async () => {
  return await axios
    .get(`${SERVER_URL}/api/projects`, {
      headers: {
        Authorization: `${token}`,
      },
    })
    .then((res) => res.data.result)
    .catch((e) => console.log(e));
});

// 프로젝트 리스트 무한스크롤
export const getProjectPage = createAsyncThunk(
  "GET/getProjectPage",
  async (page) => {
    return await axios
      .get(`${SERVER_URL}/api/projects?`, {
        headers: {
          Authorization: `${token}`,
        },
        params: {
          page: Number(page),
          sorted: "createdDate",
        },
      })
      .then((res) => res.data.result.list)
      .catch((e) => console.log(e));
  }
);

// 프로젝트 검색(검색어로)
export const searchProjectWord = createAsyncThunk(
  "GET/searchProjectWord",
  async (searchWord) => {
    return await axios
      .get(`${SERVER_URL}/api/projects?`, {
        params: {
          search: searchWord,
          sorted: "createdDate",
        },
      })
      .then((res) => res.data.result.list)
      .catch((e) => console.log(e));
  }
);

// 프로젝트 검색(언어태그로)
export const searchProjectLanguage = createAsyncThunk(
  "GET/searchProjectLanguage",
  async (searchLang) => {
    return await axios
      .get(`${SERVER_URL}/api/projects?`, {
        params: {
          language: searchLang,
          sorted: "createdDate",
        },
      })
      .then((res) => res.data.result.list)
      .catch((e) => console.log(e));
  }
);

// 프로젝트 검색(유형태그로)
export const searchProjectType = createAsyncThunk(
  "GET/searchProjectType",
  async (searchType) => {
    return await axios
      .get(`${SERVER_URL}/api/projects?`, {
        params: {
          genre: searchType,
          sorted: "createdDate",
        },
      })
      .then((res) => res.data.result.list)
      .catch((e) => console.log(e));
  }
);
// 프로젝트 썸네일 카드 클릭 시 상세 보기
export const getProjectDetails = createAsyncThunk(
  "GET/getProjectDetails",
  async (projectId) => {
    return await axios
      .get(`${SERVER_URL}/api/project/${projectId}`)
      .then((res) => res.data.result)
      .catch((e) => console.log(e));
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
            Authorization: `${token}`,
          },
        }
      )
      .then((res) => res.data);

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
          headers: { Authorization: `${token}` },
        }
      )
      .then((res) => res.data);
    return res.data;
  }
);

// 프로젝트 수정하기
export const editProject = createAsyncThunk("PUT/editProject", async (args) => {
  const res = await axios
    .put(`${SERVER_URL}/api/project/${args.projectId}`, args.formData, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log("Edit ", res.data);
      alert("프로젝트 수정이 완료되었습니다.");
    })
    .catch((e) => {
      console.log(e);
    });
});

const ProjectSlice = createSlice({
  name: "ProjectSlice",
  initialState: {
    searchTag: false,
    projectCreateModal: false,
    projectDetailModal: false,
    list: [],
    detail: {},
    file1: "",
    file2: "",
    myProject: "",
    genre: "",
  },
  reducers: {
    clickTag: (state, action) => {
      state.searchTag = action.payload;
    },
    createModal: (state, action) => {
      state.projectCreateModal = action.payload;
    },
    detailModal: (state, action) => {
      state.projectDetailModal = action.payload;
    },
  },
  extraReducers: {
    [addProject.fulfilled]: (state, action) => {
      console.log("ok");
    },
    [getProject.fulfilled]: (state, action) => {
      state.list = [...action.payload.list];
      state.myProject = action.payload.myProject[0];
      console.log("getProject");
    },
    [getProjectPage.fulfilled]: (state, action) => {
      state.list = [...state.list, ...action.payload];
      console.log("getProjectPage");
    },
    [searchProjectWord.fulfilled]: (state, action) => {
      state.list = [...action.payload];
      state.searchTag = false;
      console.log("search by word!");
    },
    [searchProjectLanguage.fulfilled]: (state, action) => {
      state.list = [...action.payload];
      state.searchTag = false;
      console.log("search by language!");
    },
    [searchProjectType.fulfilled]: (state, action) => {
      state.list = [...action.payload];
      state.searchTag = false;
      console.log("search by type!");
    },
    [getProjectDetails.fulfilled]: (state, action) => {
      state.detail = action.payload;
      state.file1 = action.payload.infoFiles[0];
      state.file2 = action.payload.infoFiles[1];
      state.genre = action.payload.genre[0];
      state.projectDetailModal = true;
      console.log("got detail!");
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
      console.log("edit!");
    },
  },
});
export const { clickTag, createModal, detailModal } = ProjectSlice.actions;
export default ProjectSlice.reducer;
