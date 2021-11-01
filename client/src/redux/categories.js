import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const initialState = {
  category: null,
  categories: [],
  loading: false,
  loadingCategory: false,
  loadingDeleteing: false,
  errors: null,
};

// ─── get Articles ──────────────────────────────────────────────────────────────────────
// @GET /api/auth/articles

export const getCategories = createAsyncThunk(
  "categories/getcategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/category/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// ─── Delete Article ──────────────────────────────────────────────────────────────────────


export const deletecategory = createAsyncThunk(
    "categories/deletecategory",
  
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/category/${id}`);
      dispatch(getCategories())
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


// ─── create a  category ──────────────────────────────────────────────────────────────────────


export const createCategory = createAsyncThunk(
  "categories/createcategory",
  async (
    { description, name },
    { rejectWithValue }
  ) => {
    try {
      const data = {
        name,
        description
        

      };
      const response = await axios.post(
        "http://localhost:5000/api/category/",
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    resetCategories(state) {
      state.posted = false
    }
  },
  extraReducers: {
    //
    // ─── get categories ───────────────────────────────────────────────────────
    //
    [getCategories.pending]: (state) => {
      state.loading = true;
      state.errors = null;
    },
    [getCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;

      state.loading = false;
      state.errors = null;
    },
    [getCategories.rejected]: (state, action) => {
      state.categories = null;
      state.loading = false;
      state.errors = action.payload;
    },

    // ─── Create category ───────────────────────────────────────────────────────
    //
    [createCategory.pending]: (state) => {
      state.loading = true;
      state.errors = null;
    },
    [createCategory.fulfilled]: (state, action) => {
      state.category= action.payload.category;
      state.posted = true
      state.loading = false;
      state.errors = null;
    },
    [createCategory.rejected]: (state, action) => {

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
    [deletecategory.pending]: (state) => {
      state.loadingDeleteing = true;
      state.loadingDeleteing = true;
      state.errors = null;
    },
    [deletecategory.fulfilled]: (state, action) => {
      state.category = action.payload;
      state.loading = false;

      state.loadingDeleteing = false;
      state.errors = null;
    },
    [deletecategory.rejected]: (state, action) => {
      state.category = null;
      state.loadingDeleteing = true;
      state.errors = action.payload;
    },
  },
});
export const { resetCategories } = categorySlice.actions
export default categorySlice.reducer;
