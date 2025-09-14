import React from 'react';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';
const Login = dynamic(() => import('@/pages/LoginPage'));
export const metadata:Metadata={
  title:"Lume | Login"
}
const Page = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default Page;
