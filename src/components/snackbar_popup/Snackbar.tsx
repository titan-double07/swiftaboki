"use client";
import React from "react";
import { SnackbarProvider } from "notistack";

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function Snackbar({ children }: ToastProviderProps) {
  return (
    <div>
      {children}
      <SnackbarProvider />
    </div>
  );
}