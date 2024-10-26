import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    token: "",
    userId: "",
    user: {},
  },
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload.token;
    },
    setUserId: (state, { payload }) => {
      state.userId = payload.userId;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { setToken, setUserId, setUser } = loginSlice.actions;
export default loginSlice.reducer;
