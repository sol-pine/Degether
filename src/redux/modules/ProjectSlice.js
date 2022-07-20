import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL, token } from "../../shared/api";

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
    .then((res) => res.data.result)
    .catch((e) => console.error(e));
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
// 프로젝트 리스트 무한스크롤
// export const getProjectPage = createAsyncThunk(
//   "GET/getProjectPage",
//   async (page) => {
//     return await axios
//       .get(`${SERVER_URL}/api/projects?`, {
//         params: {
//           page: Number(page),
//           sorted: "createdDate",
//         },
//       })
//       .then((res) => res.data.result.list)
//       .catch((e) => console.err(e));
//   }
// );

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
      .catch((e) => console.error(e));
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
      .catch((e) => console.error(e));
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
      .catch((e) => console.error(e));
  }
);

// 프로젝트 썸네일 카드 클릭 시 상세 보기
export const getProjectDetails = createAsyncThunk(
  "GET/getProjectDetails",
  async (projectId) => {
    return await axios
      .get(`${SERVER_URL}/api/project/${projectId}`)
      .then((res) => res.data.result)
      .catch((e) => console.error(e));
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
      .then((res) => res.data)
      .catch((e) => console.error(e));
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
    order: "",
    genre: "",
    searchWord: "",
    language: "",

    page: 0,
    searchTag: false,
    projectCreateModal: false,
    projectDetailModal: false,
    list: [],
    project: [],
    myProject: [],
    detail: {},
    file1: "",
    file2: "",
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
    addPage: (state, action) => {
      state.page = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setGenre: (state, action) => {
      state.genre = action.payload;
    },
    setSearchWord: (state, action) => {
      state.searchWord = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
  extraReducers: {
    [addProject.fulfilled]: (state, action) => {
      console.log("ok");
    },
    [getProject.fulfilled]: (state, action) => {
      console.log("리덕스에 있는 액션 페이로드!!!", action.payload.list);
      state.list = [...action.payload.list];
      console.log("getProject");
    },
    [getProjectPage.fulfilled]: (state, action) => {
      state.list = [...state.list, ...action.payload];
      console.log("getProjectPage");
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
export const {
  clickTag,
  createModal,
  detailModal,
  addPage,
  setOrder,
  setGenre,
  setLanguage,
  setSearchWord,
} = ProjectSlice.actions;
export default ProjectSlice.reducer;
