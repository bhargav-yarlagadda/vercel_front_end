"use client";

import Loading from "@/components/common/Loader";
import { useAuth } from "@/hooks/useAuth";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
    const router = useRouter()
  const { id } = useParams(); // Get the dynamic route param
    const {user,loading} = useAuth()
    useEffect(()=>{
        if(!loading && !user){
            router.push("/login")
        }
    },[user])
    
  return (
    <div className="p-4 min-h-[70vh] bg-[#0d0d0e]">
      
    </div>
  );
};

export default Page;
