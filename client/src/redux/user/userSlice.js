import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    signInFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    updateUserStart: (state, action) => {
      state.loading = true;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state, action) => {
      (state.loading = false), (state.error = null), (state.currentUser = null);
    },
    deleteUserFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    signOutSuccess:(state,action)=>{
      state.currentUser = null;
      state.loading = false;
      state.error = false
    }
  },
});

export const {
  signInFailure,
  signInStart,
  signInSuccess,
  updateUserSuccess,
  updateUserFailure,
  updateUserStart,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutSuccess
} = userSlice.actions;

export default userSlice.reducer;