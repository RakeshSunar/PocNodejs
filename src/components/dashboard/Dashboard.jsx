
"use client"

import { useState, useEffect } from "react"
import Sidebar from "../sidebar/Sidebar"
import RecentCustomer from "../recentCustomer/RecentCustomer"
import Progress from "../progressTrack/Progress"
import StatsCards from "../statsCards/StatsCards"
import Header from "../header/Header"
import axios from "axios"
// import { cookies } from "next/headers"

export default function Dashboard() {
  const [customers, setCustomers] = useState([])
  function getCookieValue(name) {
  const cookieString = document.cookie;
  const cookies = cookieString.split('; ');
  for (let cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === name) return value;
  }
  return null;
}

const fetchCustomers = async () => {
  // const cookieStore = await cookies();
  // console.log(document.cookie.split("=")[2],"document.cookie.split("=")[2]")
      try {
        // debugger
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/customers`,{
          headers: {
            Authorization: `Bearer ${getCookieValue('token')}`,
          },
        })
        // console.log("response customers", response.data)
        setCustomers(response.data)
      } catch (error) {
        console.error("Failed to fetch customers:", error)
      }
    }
  useEffect(() => {
    

    fetchCustomers()
  }, [])

  return (
    <>
      <div className="main-content">
        <Header />
        <main className="dashboard">
          <StatsCards />
          <div className="dashboard-grid">
            <RecentCustomer customers={customers} />
            <Progress />
          </div>
        </main>
      </div>
    </>
  )
}
