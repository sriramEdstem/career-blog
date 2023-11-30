import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import regSlice from "./regSlice";
import authReducer from "./authSlice";
import blogSlice from "./blogSlice";
import singlePostSlice from "./postDetailSlice";
import postsSlice from "./createPostSlice";
const store = configureStore({
  reducer: {
    theme: themeReducer,
    registration: regSlice,
    auth: authReducer,
    blog: blogSlice,
    singlePost: singlePostSlice,
    posts: postsSlice,
  },
});

export default store;
