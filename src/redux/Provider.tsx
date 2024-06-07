'use client'
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

interface IProviders {
  children: ReactNode;
}
export default function Providers({ children }: IProviders) {
  return <Provider store={store}>{children}</Provider>;
}
