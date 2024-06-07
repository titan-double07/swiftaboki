import { createSlice } from "@reduxjs/toolkit";
import { IAccount } from "../../interfaces";
import { accountArr } from "../../utils";

// interface IinitialState {
//   accounts: IAccount[];
//   selectedAccount: IAccount;
// }

const getAccounts = () => {
    return typeof window !== "undefined"
      ? (() => {
          const accounts = window.localStorage.getItem("swift_aboki_accounts");
          return accounts ? JSON.parse(accounts) : accountArr;
        })()
      : accountArr;
  };

  const getSelectedAccount = () => {
    return typeof window !== "undefined"
      ? (() => {
          const selectedAccount = window.localStorage.getItem("swift_aboki_selected_account");
          return selectedAccount ? JSON.parse(selectedAccount) : accountArr[1];
        })()
      : accountArr[1];
  };

const initialState = {
  accounts: getAccounts(),
  selectedAccount: getSelectedAccount(),
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    addAccount: (state, action) => {
      const newArr = state.accounts.push(action.payload);
      state.accounts = newArr;
      localStorage.setItem(
        "swift_aboki_accounts",
        JSON.stringify(state.accounts)
      );
    },
    selectAccount: (state, action) => {
      const selectedAccount: IAccount = state.accounts.find(
        (account: IAccount) => account.type === action.payload
      );
      state.selectedAccount = selectedAccount;
      localStorage.setItem(
        "swift_aboki_selected_account",
        JSON.stringify(state.selectedAccount)
      );
    },
  },
});

export const { addAccount, selectAccount } = accountSlice.actions;
