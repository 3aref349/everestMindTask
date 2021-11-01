import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const initialState = {
  cart: null,
  carts: [],
  loading: false,
  loadingCart: false,
  loadingDeleteing: false,
  errors: null,
};

// ─── get Articles ──────────────────────────────────────────────────────────────────────
// @GET /api/auth/articles

export const getCarts = createAsyncThunk(
  "carts/getcarts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/cart/");
      return response.data;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err.response.data);
    }
  }
);
// ─── Delete Article ──────────────────────────────────────────────────────────────────────


export const deleteCart = createAsyncThunk(
    "carts/deleteCart",
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/carts/${id}`);
      dispatch(getCarts())
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


// ─── Crete a  Cart ──────────────────────────────────────────────────────────────────────


export const createCart = createAsyncThunk(
  "carts/createcart",
  async (
    { name },
    { rejectWithValue }
  ) => {
    try {
      const data = {
        name
     

      };
      const response = await axios.post(
        "http://localhost:5000/api/carts/",
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    resetCart(state) {
      state.posted = false
    }
  },
  extraReducers: {
    //
    // ─── getarticles ───────────────────────────────────────────────────────
    //
    [getCarts.pending]: (state) => {
      state.loading = true;
      state.errors = null;
    },
    [getCarts.fulfilled]: (state, action) => {
      state.carts = action.payload;

      state.loading = false;
      state.errors = null;
    },
    [getCarts.rejected]: (state, action) => {
      state.carts = null;
      state.loading = false;
      state.errors = action.payload;
    },

    // ─── Create message ───────────────────────────────────────────────────────
    //
    [createCart.pending]: (state) => {
      state.loading = true;
      state.errors = null;
    },
    [createCart.fulfilled]: (state, action) => {
      state.carts = action.payload.carts;
      state.posted = true
      state.loading = false;
      state.errors = null;
    },
    [createCart.rejected]: (state, action) => {

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
    [deleteCart.pending]: (state) => {
      state.loadingDeleteing = true;
      state.loadingDeleteing = true;
      state.errors = null;
    },
    [deleteCart.fulfilled]: (state, action) => {
      state.cart = action.payload;
      state.loading = false;

      state.loadingDeleteing = false;
      state.errors = null;
    },
    [deleteCart.rejected]: (state, action) => {
      state.cart = null;
      state.loadingDeleteing = true;
      state.errors = action.payload;
    },
  },
});
export const { resetCart } = cartSlice.actions
export default cartSlice.reducer;
