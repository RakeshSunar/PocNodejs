"use client"
import React from 'react'

function StatsCards({customers,customerTransactions,customersAllServiceRecords}) {
  console.log("customersAllServiceRecords--->",customersAllServiceRecords)

  const totalCustomers = customers.length || 0;
  // const pendingServices = customersAllServiceRecords.length || 0;
  // const monthlyTurnover = customers.reduce((acc, customer) => acc + parseFloat(customer.total_amount || 0), 0);


  const currentDate = new Date();
const currentMonth = currentDate.getMonth(); // 0-indexed (0 = Jan)
const currentYear = currentDate.getFullYear();

const monthlyTurnover = customerTransactions.reduce((acc, transaction) => {
  const regDate = new Date(transaction.PaymentDate.split("T")[0]);
  const regMonth = regDate.getMonth();
  const regYear = regDate.getFullYear();

  if (regMonth === currentMonth && regYear === currentYear) {
    return acc + parseFloat(transaction.TransactionAmount || 0);
  }
  return acc;
}, 0);


// const currentDate = new Date();
currentDate.setHours(0, 0, 0, 0); // normalize time to compare date-only

const pendingServices = customersAllServiceRecords.filter((record) => {
  const nextServiceDate = new Date(record.next_service_date);
  nextServiceDate.setHours(0, 0, 0, 0); // normalize time to compare date-only
  // Check if the next service date is today or in the future
  return nextServiceDate >= currentDate;
}).length;


  return (
    <>
      {/* Stats Cards */}
          <div className="stats-grid">
            <div className="card">
              <div className="card-content">
                <div className="stat-card">
                  <div className="stat-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
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
                  </div>
                  <div className="stat-info">
                    <span className="stat-label">Total Customers</span>
                    <span className="stat-value">{totalCustomers}</span>
                    <div className="stat-trend">
                      <span className="stat-trend-label">Since last month</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="trend-up"
                      >
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                        <polyline points="17 6 23 6 23 12" />
                      </svg>
                      <span className="trend-up">22%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <div className="stat-card">
                  <div className="stat-icon orange">
                    <div className="stat-icon-inner"></div>
                  </div>
                  <div className="stat-info">
                    <span className="stat-label">Monthly Turnover</span>
                    <span className="stat-value">{monthlyTurnover}</span>
                    <div className="stat-trend">
                      <span className="stat-trend-label">Since last month</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="trend-down"
                      >
                        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
                        <polyline points="17 18 23 18 23 12" />
                      </svg>
                      <span className="trend-down">2%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <div className="stat-card">
                  <div className="stat-icon purple">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <line x1="10" y1="9" x2="8" y2="9" />
                    </svg>
                  </div>
                  <div className="stat-info">
                    <span className="stat-label">Pending Services</span>
                    <span className="stat-value">{pendingServices}</span>
                    <div className="stat-trend">
                      <span className="stat-trend-label">Since last month</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="trend-up"
                      >
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                        <polyline points="17 6 23 6 23 12" />
                      </svg>
                      <span className="trend-up">4%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}

export default StatsCards
