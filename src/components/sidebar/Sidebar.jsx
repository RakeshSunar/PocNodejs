"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function Sidebar() {
  const [isCustomerOpen, setCustomerOpen] = useState(false);
  const [isEmployeeOpen, setEmployeeOpen] = useState(false);
    const router = useRouter();


  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="company-logo">
          <span className="company-name">Company Name</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-items">
          {/* Dashboard */}
          <div onClick={() => router.push('/')} className="nav-item active">
            <div className="nav-icon-container">
              <div className="nav-icon-dot"></div>
            </div>
            <span>Dashboard</span>
          </div>

          {/* Transactions */}
          <div className="nav-item">
            <span>Transactions</span>
          </div>

          {/* Customers */}
          <div className="nav-item" onClick={() => setCustomerOpen(!isCustomerOpen)}>
            <span>Customers</span>
            <svg className="nav-item-right" viewBox="0 0 24 24">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </div>
          {isCustomerOpen && (
            <div className="dropdown">
              <Link href="/addcustomer" className="dropdown-item"> Add Customer</Link> 
              <Link href="/customer-transaction" className="dropdown-item"> Customer Transaction</Link> 
              <Link href="/customer-update" className="dropdown-item"> Update Details</Link> 
              <Link href="/customer-service-records" className="dropdown-item"> Service Records</Link> 
              <Link href="/customer-profile" className="dropdown-item"> Customer Profile</Link> 
            </div>
          )}

          {/* Employees */}
          <div className="nav-item" onClick={() => setEmployeeOpen(!isEmployeeOpen)}>
            <span>Employees</span>
            <svg className="nav-item-right" viewBox="0 0 24 24">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </div>
          {isEmployeeOpen && (
            <div className="dropdown">
              <Link href="/addemployee" className="dropdown-item">Add Employee</Link> 
              <Link href="/employee-update" className="dropdown-item">Check & Update Details</Link>
              {/* <Link href="/employee-records" className="dropdown-item"> Records</Link> */}
            </div>
          )}
        </div>
      </nav>

      <div className="sidebar-footer">
        <button className="reminder-button">
          <svg viewBox="0 0 24 24" width={24} height={24}>
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
          Send Reminder
        </button>
      </div>
    </div>
  );
}

export default Sidebar;