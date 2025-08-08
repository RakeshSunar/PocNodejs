
"use client"

import { useState, useEffect } from "react"
import Sidebar from "../sidebar/Sidebar"
import RecentCustomer from "../recentCustomer/RecentCustomer"
import Progress from "../progressTrack/Progress"
import StatsCards from "../statsCards/StatsCards"
import Header from "../header/Header"
import axios from "axios"
import { getCookieValue } from "../../../utils/getCookie"
// import { cookies } from "next/headers"

export default function Dashboard() {
  const [customers, setCustomers] = useState([])
  const [customerTransactions, setCustomerTransactions] = useState([])
//   function getCookieValue(name) {
//   const cookieString = document.cookie;
//   const cookies = cookieString.split('; ');
//   for (let cookie of cookies) {
//     const [key, value] = cookie.split('=');
//     if (key === name) return value;
//   }
//   return null;
// }

const fetchCustomers = async () => {
  // const cookieStore = await cookies();
  // console.log(document.cookie,"main cookie")
  // console.log("cookie",document.cookie.split("=")[2])
  const token = getCookieValue("token")
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/customers`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setCustomers(response.data)
      } catch (error) {
        console.error("Failed to fetch customers:", error)
      }
    }

  const fetchTransactionData = async () => {
      try {
        const token = getCookieValue("token");
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/transactions/getAllCustomerTransaction`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setCustomerTransactions(res.data); // adjust based on response 
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };    
  useEffect(() => {
    

    fetchCustomers()
    fetchTransactionData()
  }, [])

  return (
    <>
      <div className="main-content">
        <Header />
        <main className="dashboard">
          <StatsCards customers={customers} customerTransactions={customerTransactions} />
          <div className="dashboard-grid">
            <RecentCustomer customers={customers} />
            <Progress  customers={customers} />
          </div>
        </main>
      </div>
    </>
  )
}
