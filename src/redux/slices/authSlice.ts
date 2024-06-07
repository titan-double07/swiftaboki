import { ILoggedInUser } from "@/interfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  user: ILoggedInUser | null;
}

// const getInitialState = () => {
//   return typeof window !== "undefined"
//     ? (() => {
//         const storedUser = window.localStorage.getItem("swift_aboki_user");
//         return storedUser ? JSON.parse(storedUser) : null;
//       })()
//     : null;
// };

const initialState: IInitialState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
});

export const { login } = authSlice.actions;