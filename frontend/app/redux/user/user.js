"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    user: {},
    isAuthenticated: false,
  },
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.value = {
        ...state.value,
        user: action.payload,
        isAuthenticated: true,
      };
    },
    userLogout: (state) => {
      state.value = {
        ...state.value,
        user: {},
        isAuthenticated: false,
      };
    },
    getUser: (state) => {
      state.value = { ...state.value };
    },
  },
});

export const { userLogin, userLogout, getUser } = user.actions;

export default user.reducer;
