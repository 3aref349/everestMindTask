import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const initialState = {
  order: null,
  orders: [],
  loading: false,
  loadingorder: false,
  loadingDeleteing: false,
  errors: null,
};

// ─── get Articles ──────────────────────────────────────────────────────────────────────
// @GET /api/auth/articles

export const getOrders = createAsyncThunk(
  "orders/getorders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// ─── Delete Article ──────────────────────────────────────────────────────────────────────


export const deleteOrder = createAsyncThunk(
  "orders/deleteorders",
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/orders/${id}`);
      dispatch(getOrders())
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


// ─── Crete a  article ──────────────────────────────────────────────────────────────────────


export const createOrder = createAsyncThunk(
  "orders/createorder",
  async (
    { totalPrice, itemPrice, count, cart,product},
    { rejectWithValue }
  ) => {
    try {
      const data = {
        totalPrice, 
        itemPrice,
         count,
          cart,
          product

      };
      const response = await axios.post(
        "http://localhost:5000/api/orders/",
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetOrder(state) {
      state.posted = false
    }
  },
  extraReducers: {
    //
    // ─── getarticles ───────────────────────────────────────────────────────
    //
    [getOrders.pending]: (state) => {
      state.loading = true;
      state.errors = null;
    },
    [getOrders.fulfilled]: (state, action) => {
      state.orders = action.payload;

      state.loading = false;
      state.errors = null;
    },
    [getOrders.rejected]: (state, action) => {
      state.orders = null;
      state.loading = false;
      state.errors = action.payload;
    },

    // ─── Create message ───────────────────────────────────────────────────────
    //
    [createOrder.pending]: (state) => {
      state.loading = true;
      state.errors = null;
    },
    [createOrder.fulfilled]: (state, action) => {
      state.orders = action.payload.orders;
      state.posted = true
      state.loading = false;
      state.errors = null;
    },
    [createOrder.rejected]: (state, action) => {

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
    [deleteOrder.pending]: (state) => {
      state.loadingDeleteing = true;
      state.loadingDeleteing = true;
      state.errors = null;
    },
    [deleteOrder.fulfilled]: (state, action) => {
      state.order = action.payload;
      state.loading = false;

      state.loadingDeleteing = false;
      state.errors = null;
    },
    [deleteOrder.rejected]: (state, action) => {
      state.order = null;
      state.loadingDeleteing = true;
      state.errors = action.payload;
    },
  },
});
export const { resetOrder } = orderSlice.actions
export default orderSlice.reducer;
