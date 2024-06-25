"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    mainSong: { id: null, title: null, artist: null, mp3: null },
    isPlaying: false,
  },
};

export const song = createSlice({
  name: "mainSong",
  initialState,
  reducers: {
    playSong: (state, action) => {
      state.value = {
        ...state.value,
        mainSong: action.payload,
        isPlaying: true,
      };
    },
    pauseSong: (state) => {
      state.value = { ...state.value, isPlaying: false };
    },
    playMaster: (state) => {
      state.value = {
        ...state.value,

        isPlaying: true,
      };
    },
    pauseMaster: (state) => {
      state.value = { ...state.value, isPlaying: false };
    },
  },
});

export const { playSong, pauseSong, playMaster, pauseMaster } = song.actions;

export default song.reducer;
