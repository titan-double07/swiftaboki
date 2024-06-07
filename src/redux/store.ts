import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { accountSlice } from "./slices/accountSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    account: accountSlice.reducer,
  },
});
