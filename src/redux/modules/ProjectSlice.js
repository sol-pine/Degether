import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL, token } from "../../shared/api";

// 프로젝트 생성하기
export const addProject = createAsyncThunk(
  "ADD/addProject",
  async (formData) => {
    const res = await axios
      .post(`${SERVER_URL}/api/project`, formData, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => console.log(res.data))
      .catch((e) => console.error(e.message));
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

// 프로젝트 상세 보기
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
      .then((res) => res.data)
      .catch((e) => console.error(e));
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
      console.error(e);
    });
});

// export const getProject = createAsyncThunk("GET/getProject", async (args) => {
//   return await axios
//     .get(`${SERVER_URL}/api/projects?`, {
//       params: {
//         search: args.searchWord ? args.searchWord : null,
//         language: args.language ? args.language : null,
//         genre: args.genre ? args.genre : null,
//         sorted: args.sorted,
//         page: args.page ? Number(args.page) : 0,
//       },
//     })
//     .then((res) => res.data.result)
//     .catch((e) => console.error(e));
// });

// 프로젝트 자료 수정
export const editFiles = createAsyncThunk("POST/editFiles", async (args) => {
  const res = await axios
    .post(`${SERVER_URL}/api/infoFile/${args.projectId}?`, args.formData, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log("Edit ", res.data);
    })
    .catch((e) => {
      console.error(e);
    });
});

const ProjectSlice = createSlice({
  name: "ProjectSlice",
  initialState: {
    order: "",
    genre: "",
    searchWord: "",
    language: "",
    searchTag: false,
    projectCreateModal: false,
    projectDetailModal: false,
    list: [],
    file: {},
    project: [],
    myProject: [],
    detail: {},
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
      state.createModal = false;
      window.location.replace("/");
      console.log("ok");
    },
    [getProject.fulfilled]: (state, action) => {
      state.list = [...action.payload.list];
      console.log("getProject");
    },
    [getProjectPage.fulfilled]: (state, action) => {
      state.list = [...state.list, ...action.payload];
      console.log("getProjectPage");
    },
    [getProjectDetails.fulfilled]: (state, action) => {
      state.detail = action.payload;
      if (action.payload.infoFiles) {
        state.file = action.payload.infoFiles[0];
      }
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
