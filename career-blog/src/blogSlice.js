import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const initialState = {
  posts: [],
  currentPage: 0,
  totalPosts: null,
  status: "idle",
  error: null,
  searchResults: [],
};

export const blogs = createAsyncThunk(
  "blog/fetchPost",
  async ({ pageNumber, token }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/blog/post/list`,
        {
          pageNumber,
          pageSize: 10,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

export const searchPosts = createAsyncThunk(
  "blog/searchPosts",
  async ({ query, token }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/blog/post/search?query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const categoryPosts = createAsyncThunk(
  "category/searchCategory",
  async ({ token, category }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/blog/post/categories/${category}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(blogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(blogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload.posts;
        state.totalPosts = action.payload.totalPosts;
      })
      .addCase(blogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(searchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchResults = action.payload;
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(categoryPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(categoryPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(categoryPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default blogSlice.reducer;
