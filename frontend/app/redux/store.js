"use client";

import { configureStore } from "@reduxjs/toolkit";
import songReducer from "./mainSong/song";
import userReducer from "./user/user";
export const store = configureStore({
  reducer: {
    mainSong: songReducer,
    account: userReducer,
  },
});
