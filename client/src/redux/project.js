import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const initialState = {
  project: null,
  projects: [],
  loading: false,
  loadingProject: false,
  errors: null,
};

// ─── get Articles ──────────────────────────────────────────────────────────────────────
// @GET /api/auth/articles

export const getProjects = createAsyncThunk(
  "projects/getprojects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/projects/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// ─── Delete Article ──────────────────────────────────────────────────────────────────────


// export const deleteArticle = createAsyncThunk(
//   "articles/deletearticle",
//   async ({ id }, { rejectWithValue, dispatch }) => {
//     try {
//       const response = await axios.delete(`http://localhost:4000/api/articles/${id}`);
//       dispatch(getArticles())
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );


// ─── Crete a  Project ──────────────────────────────────────────────────────────────────────


export const createProject = createAsyncThunk(
  "projects/createproject",
  async (
    { title, description, authorName },
    { rejectWithValue }
  ) => {
    try {
      const data = {
        Name, location,contractualStartDate,contractualEndDate

      };
      const response = await axios.post(
        "http://localhost:5000/api/projects/",
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    resetProject(state) {
      state.posted = false
    }
  },
  extraReducers: {
    //
    // ─── getarticles ───────────────────────────────────────────────────────
    //
    [getProjects.pending]: (state) => {
      state.loading = true;
      state.errors = null;
    },
    [getProjects.fulfilled]: (state, action) => {
      state.projects = action.payload;

      state.loading = false;
      state.errors = null;
    },
    [getProjects.rejected]: (state, action) => {
      state.projects = null;
      state.loading = false;
      state.errors = action.payload;
    },

    // ─── Create message ───────────────────────────────────────────────────────
    //
    [createProject.pending]: (state) => {
      state.loading = true;
      state.errors = null;
    },
    [createProject.fulfilled]: (state, action) => {
      state.projects = action.payload.projects;
      state.posted = true
      state.loading = false;
      state.errors = null;
    },
    [createProject.rejected]: (state, action) => {

      state.loading = false;
      state.errors = action.payload;
    },
    //
    // ─── getArticle ───────────────────────────────────────────────────────
    //
    // [getArticle.pending]: (state) => {
    //   state.loadingCourse = true;
    //   state.errors = null;
    // },
    // [getArticle.fulfilled]: (state, action) => {
    //   state.course = action.payload;

    //   state.loadingArticle = false;
    //   state.errors = null;
    // },
    // [getArticle.rejected]: (state, action) => {
    //   state.course = null;
    //   state.loadingArticle = false;
    //   state.errors = action.payload;
    // }

    // Delete Article
    [deleteArticle.pending]: (state) => {
      state.loadingDeleteing = true;
      state.loadingDeleteing = true;
      state.errors = null;
    },
    [deleteArticle.fulfilled]: (state, action) => {
      state.article = action.payload;
      state.loading = false;

      state.loadingDeleteing = false;
      state.errors = null;
    },
    [deleteArticle.rejected]: (state, action) => {
      state.article = null;
      state.loadingDeleteing = true;
      state.errors = action.payload;
    },
  },
});
export const { resetProject } = articleSlice.actions
export default projectSlice.reducer;
