import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    token: "",
    userId: "",
  },
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload.token;
    },
    setUserId: (state, { payload }) => {
      state.userId = payload.userId;
    },
  },
});

export const { setToken, setUserId } = loginSlice.actions;
export default loginSlice.reducer;
