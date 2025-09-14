"use client"

import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import DashBoardNavbar from "@/components/DashBoardNavbar"
import Loading from "@/components/common/Loader"
import DashboardConsole from "@/components/DashboardConsole"

const DashboardPage = () => {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [loading, user, router])

    if(loading){
    return <Loading/>
  }




  return (
    <div className="">
      <DashBoardNavbar />
      {/* Dashboard content */}
      <DashboardConsole/>
    </div>
  )
}

export default DashboardPage
