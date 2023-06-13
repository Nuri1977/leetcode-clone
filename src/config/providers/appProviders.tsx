"use client";

import React from "react";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecoilRoot>
      <ToastContainer theme={"dark"} />
      {children}
    </RecoilRoot>
  );
};

export default AppProviders;
