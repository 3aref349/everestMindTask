import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const initialState = {
  product: null,
  products: [],
  loading: false,
  loadingProduct: false,
  loadingDeleteing: false,
  errors: null,
};

// ─── get Articles ──────────────────────────────────────────────────────────────────────
// @GET /api/auth/articles

export const getProducts = createAsyncThunk(
  "products/getproducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/product");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// ─── Delete Article ──────────────────────────────────────────────────────────────────────


export const deleteProduct = createAsyncThunk(
    "products/deleteproduct",
  
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/product/${id}`);
      dispatch(getProducts())
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


// ─── create a  category ──────────────────────────────────────────────────────────────────────


export const createProduct = createAsyncThunk(
  "products/getproducts",
  async (
    { productName,
        productPrice,
        category,
        subcategory  },
    { rejectWithValue }
  ) => {
    try {
      const data = {
        productName,
         productPrice,
         category,
         subcategory 
        

      };
      const response = await axios.post(
        "http://localhost:5000/api/product",
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetProduct(state) {
      state.posted = false
    }
  },
  extraReducers: {
    //
    // ─── get categories ───────────────────────────────────────────────────────
    //
    [getProducts.pending]: (state) => {
      state.loading = true;
      state.errors = null;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.products = action.payload;

      state.loading = false;
      state.errors = null;
    },
    [getProducts.rejected]: (state, action) => {
      state.products = null;
      state.loading = false;
      state.errors = action.payload;
    },

    // ─── Create category ───────────────────────────────────────────────────────
    //
    [createProduct.pending]: (state) => {
      state.loading = true;
      state.errors = null;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.product= action.payload.product;
      state.posted = true
      state.loading = false;
      state.errors = null;
    },
    [createProduct.rejected]: (state, action) => {

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
    [deleteProduct.pending]: (state) => {
      state.loadingDeleteing = true;
      state.loadingDeleteing = true;
      state.errors = null;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.product = action.payload;
      state.loading = false;

      state.loadingDeleteing = false;
      state.errors = null;
    },
    [deleteProduct.rejected]: (state, action) => {
      state.product = null;
      state.loadingDeleteing = true;
      state.errors = action.payload;
    },
  },
});
export const { resetProduct } = productSlice.actions
export default productSlice.reducer;
