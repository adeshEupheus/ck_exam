import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialAuthState = {
  user: Cookies.get("token") || "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.user = Cookies.get("token");
    },

    logout(state) {
      state.user = false;
      state.id = false;
      Cookies.remove("token");
      Cookies.remove("user");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
