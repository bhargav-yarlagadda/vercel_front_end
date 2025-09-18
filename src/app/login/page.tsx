"use client";
import React from "react";
import dynamic from "next/dynamic";


const Login = dynamic(() => import("@/ui_pages/LoginPage"), { ssr: false });

const Page = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default Page;
