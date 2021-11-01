import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const initialState = {
  article: null,
  articles: [],
  loading: false,
  loadingArticle: false,
  loadingDeleteing: false,
  errors: null,
};

// ─── get Articles ──────────────────────────────────────────────────────────────────────
// @GET /api/auth/articles

export const getArticles = createAsyncThunk(
  "articles/getarticles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:4000/api/articles/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// ─── Delete Article ──────────────────────────────────────────────────────────────────────


export const deleteArticle = createAsyncThunk(
  "articles/deletearticle",
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/articles/${id}`);
      dispatch(getArticles())
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


// ─── Crete a  article ──────────────────────────────────────────────────────────────────────


export const createArticle = createAsyncThunk(
  "articles/createarticle",
  async (
    { title, description, authorName },
    { rejectWithValue }
  ) => {
    try {
      const data = {
        title,
        description,
        authorName

      };
      const response = await axios.post(
        "http://localhost:4000/api/articles/",
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    resetArticles(state) {
      state.posted = false
    }
  },
  extraReducers: {
    //
    // ─── getarticles ───────────────────────────────────────────────────────
    //
    [getArticles.pending]: (state) => {
      state.loading = true;
      state.errors = null;
    },
    [getArticles.fulfilled]: (state, action) => {
      state.articles = action.payload;

      state.loading = false;
      state.errors = null;
    },
    [getArticles.rejected]: (state, action) => {
      state.articles = null;
      state.loading = false;
      state.errors = action.payload;
    },

    // ─── Create message ───────────────────────────────────────────────────────
    //
    [createArticle.pending]: (state) => {
      state.loading = true;
      state.errors = null;
    },
    [createArticle.fulfilled]: (state, action) => {
      state.articles = action.payload.articles;
      state.posted = true
      state.loading = false;
      state.errors = null;
    },
    [createArticle.rejected]: (state, action) => {

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
export const { resetArticles } = articleSlice.actions
export default articleSlice.reducer;
