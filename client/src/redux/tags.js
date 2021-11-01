import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const initialState = {
  tag: null,
  tags: [],
  loading: false,
  loadingTag: false,
  loadingDeleteing: false,
  errors: null,
};

// ─── get Articles ──────────────────────────────────────────────────────────────────────
// @GET /api/auth/articles

export const getTags = createAsyncThunk(
  "tags/gettags",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/tag/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// ─── Delete Article ──────────────────────────────────────────────────────────────────────


export const deleteTag = createAsyncThunk(
  "tags/deletetag",
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/tag/${id}`);
      dispatch(getTags())
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


// ─── Crete a  article ──────────────────────────────────────────────────────────────────────


export const createTag = createAsyncThunk(
  "tag/createtag",
  async (
    { tagName },
    { rejectWithValue }
  ) => {
    try {
      const data = {
        tagName,
    

      };
      const response = await axios.post(
        "http://localhost:5000/api/tag/",
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const tagSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    resetTag(state) {
      state.posted = false
    }
  },
  extraReducers: {
    //
    // ─── getTags ───────────────────────────────────────────────────────
    //
    [getTags.pending]: (state) => {
      state.loading = true;
      state.errors = null;
    },
    [getTags.fulfilled]: (state, action) => {
      state.tags = action.payload;

      state.loading = false;
      state.errors = null;
    },
    [getTags.rejected]: (state, action) => {
      state.tags = null;
      state.loading = false;
      state.errors = action.payload;
    },

    // ─── Create message ───────────────────────────────────────────────────────
    //
    [createTag.pending]: (state) => {
      state.loading = true;
      state.errors = null;
    },
    [createTag.fulfilled]: (state, action) => {
      state.tags = action.payload.tags;
      state.posted = true
      state.loading = false;
      state.errors = null;
    },
    [createTag.rejected]: (state, action) => {

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

    // Delete Tag
    [deleteTag.pending]: (state) => {
      state.loadingDeleteing = true;
      state.loadingDeleteing = true;
      state.errors = null;
    },
    [deleteTag.fulfilled]: (state, action) => {
      state.tag = action.payload;
      state.loading = false;

      state.loadingDeleteing = false;
      state.errors = null;
    },
    [deleteTag.rejected]: (state, action) => {
      state.tag = null;
      state.loadingDeleteing = true;
      state.errors = action.payload;
    },
  },
});
export const { resetTag } = tagSlice.actions
export default tagSlice.reducer;
