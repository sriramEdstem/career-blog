import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  successMessage: null,
};

export const postData = createAsyncThunk("type/postData", async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8090/security/signup",
      data
    );
    console.log("gi", data);

    return response.data;
  } catch (err) {
    console.log(data);
    return err.response.data;
  }
});

const regSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postData.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = "Registration successful!";
      })
      .addCase(postData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default regSlice.reducer;
