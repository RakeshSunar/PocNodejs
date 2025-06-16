"use client"

import { useState } from "react"
import Sidebar from "../sidebar/Sidebar"
import RecentCustomer from "../recentCustomer/RecentCustomer"
import Progress from "../progressTrack/Progress"
import StatsCards from "../statsCards/StatsCards"
import Header from "../header/Header"

export default function Dashboard() {

  const [customers, setCustomers] = useState([
    {
      name: "rishi",
      treatment: "General Disinfection,",
      contact: "9619438148",
      amount: "10000",
    },
    {
      name: "Vishwajit Rajkumar Rajbhar",
      treatment: "Termite Control,",
      contact: "9619438148",
      amount: "10000",
    },
    {
      name: "Vishwajit Rajkumar Rajbhar",
      treatment: "Termite Control,",
      contact: "8779546242",
      amount: "10000",
    },
  ])

  return (
<>

      {/* Sidebar */}
      {/* <div className="sidebar">
        <div className="sidebar-header">
          <div className="company-logo">
            <span className="company-name">Pest Control Company</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-items">
            <div className="nav-item active">
              <div className="nav-icon-container">
                <div className="nav-icon-dot"></div>
              </div>
              <span>Dashboard</span>
            </div>

            <div className="nav-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
              <span>Transactions</span>
            </div>

            <div className="nav-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span>Customers</span>
              <svg
                className="nav-item-right"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>

            <div className="nav-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span>Employees</span>
              <svg
                className="nav-item-right"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
          </div>
        </nav>

        <div className="sidebar-footer">
          <button className="reminder-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            Send Reminder
          </button>
        </div>
      </div> */}

      {/* Main Content */}


      <div className="main-content">
        {/* Header */}
         <Header />
        {/* Dashboard Content */}
        <main className="dashboard">
            {/* Stats Cards */}
          <StatsCards/>
          <div className="dashboard-grid">
            {/* Recent Customer Table */}
            <RecentCustomer customers={customers}  />
            {/* Progress Track */}
            <Progress />
          </div>
        </main>
      </div>
    </>
  )
}
