// 'use client'
import React from 'react'

function RecentCustomer({ customers }) {
  return (
   <div className="card">
              <div className="card-header">
                <h2 className="card-title">Recent Customer</h2>
                <button className="button">See all</button>
              </div>
              <div className="card-content">
                <div className="table-container">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>CUSTOMER NAME</th>
                        <th>TREATMENT</th>
                        <th>CONTACT NO</th>
                        <th>AMOUNT</th>
                        <th>PROFILE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((customer, index) => (
                        <tr key={index}>
                          <td>{customer.name}</td>
                          <td>{customer.treatment}</td>
                          <td>{customer.contact}</td>
                          <td>{customer.amount}</td>
                          <td>
                            <button className="view-button">View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
  )
}

export default RecentCustomer
