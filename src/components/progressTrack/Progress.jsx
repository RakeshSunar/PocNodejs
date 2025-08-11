import React from 'react'

function Progress({ customersAllServiceRecords}) {
  const today = new Date();
const currentMonth = today.getMonth(); // 0-indexed
const currentYear = today.getFullYear();

const thisMonthPendingServices = customersAllServiceRecords.filter((record) => {
  const nextServiceDate = new Date(record.next_service_date);
  return (
    nextServiceDate.getMonth() === currentMonth &&
    nextServiceDate.getFullYear() === currentYear
  );
}).length;

// Calculate next month and handle year rollover
const nextMonth = (currentMonth + 1) % 12;
const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;

const nextMonthServices = customersAllServiceRecords.filter((record) => {
  const serviceDate = new Date(record.next_service_date);
  return (
    serviceDate.getMonth() === nextMonth &&
    serviceDate.getFullYear() === nextMonthYear
  );
}).length;

  return (
    <div className="progress-section">
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">Progress track</h2>
                  <button className="button">See tasks</button>
                </div>
                <div className="card-content">
                  <div className="progress-item">
                    <div className="progress-label">
                      <svg
                        className="progress-icon"
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
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                        <line x1="16" x2="16" y1="2" y2="6" />
                        <line x1="8" x2="8" y1="2" y2="6" />
                        <line x1="3" x2="21" y1="10" y2="10" />
                      </svg>
                      <span className="progress-text">This month Services</span>
                    </div>
                    <span className="progress-value">{thisMonthPendingServices}</span>
                  </div>

                  <div className="progress-item">
                    <div className="progress-label">
                      <svg
                        className="progress-icon"
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
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      <span className="progress-text">Completed Services</span>
                    </div>
                    <span className="progress-value">0</span>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">Services in Upcoming Month</h2>
                </div>
                <div className="card-content">
                  <div className="stat-card">
                    <div className="service-icon">
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
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <div className="service-info">
                      <span className="service-label">No. of service</span>
                      <span className="service-value">{nextMonthServices}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  )
}

export default Progress
