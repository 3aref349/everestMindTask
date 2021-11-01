import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const initialState = {
  subcategory: null,
  subcategories: [],
  loading: false,
  loadingArticle: false,
  loadingDeleteing: false,
  errors: null,
};

// ─── get subs ──────────────────────────────────────────────────────────────────────


export const getSubcategories = createAsyncThunk(
  "subs/getsubcategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/subcategory/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// ─── Delete Article ──────────────────────────────────────────────────────────────────────


export const deleteSubcategories = createAsyncThunk(
  "subs/deletesub",
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/subcategory/${id}`);
      dispatch(getSubcategories())
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


// ─── Crete a  article ──────────────────────────────────────────────────────────────────────


export const createSub = createAsyncThunk(
  "subs/createsub",
  async (
    { name, category },
    { rejectWithValue }
  ) => {
    try {
      const data = {
        name,
        category
     

      };
      const response = await axios.post(
        "http://localhost:5000/api/subcategory/",
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const subSlice = createSlice({
  name: "subs",
  initialState,
  reducers: {
    resetSubs(state) {
      state.posted = false
    }
  },
  extraReducers: {
    //
    // ─── getarticles ───────────────────────────────────────────────────────
    //
    [getSubcategories.pending]: (state) => {
      state.loading = true;
      state.errors = null;
    },
    [getSubcategories.fulfilled]: (state, action) => {
      state.subcategories = action.payload;

      state.loading = false;
      state.errors = null;
    },
    [getSubcategories.rejected]: (state, action) => {
      state.subcategories = null;
      state.loading = false;
      state.errors = action.payload;
    },

    // ─── Create message ───────────────────────────────────────────────────────
    //
    [createSub.pending]: (state) => {
      state.loading = true;
      state.errors = null;
    },
    [createSub.fulfilled]: (state, action) => {
      state.subcategories = action.payload.subcategories;
      state.posted = true
      state.loading = false;
      state.errors = null;
    },
    [createSub.rejected]: (state, action) => {

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
    [deleteSubcategories.pending]: (state) => {
      state.loadingDeleteing = true;
      state.loadingDeleteing = true;
      state.errors = null;
    },
    [deleteSubcategories.fulfilled]: (state, action) => {
      state.subcategory = action.payload;
      state.loading = false;

      state.loadingDeleteing = false;
      state.errors = null;
    },
    [deleteSubcategories.rejected]: (state, action) => {
      state.subcategory = null;
      state.loadingDeleteing = true;
      state.errors = action.payload;
    },
  },
});
export const { resetSubs } = subSlice.actions
export default subSlice.reducer;
