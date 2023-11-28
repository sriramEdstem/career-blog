import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { register } from "../service";

const initialState = {
  loading: false,
  error: null,
  successMessage: null,
};

export const registerUser = createAsyncThunk("type/postData", async (data) => {
  try {
    const response = await register(data);
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
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = "Registration successful!";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default regSlice.reducer;
