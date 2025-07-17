"use client";
import React, { useEffect, useState } from "react";
import styles from "../../../components/employee/addEmployee/addEmployee.module.css";
import axios from "axios";
import { getCookieValue } from "../../../../utils/getCookie";

const EmployeeProfileView = ({ params }) => {
  const { id: employeeId } = React.use(params);
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = getCookieValue("token");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/employees/${employeeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEmployee(response.data[0]);
      } catch (error) {
        console.error("Failed to fetch employee records:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [employeeId]);

  if (loading) return <div>Loading...</div>;
  if (!employee) return <div>No records found.</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Employee Profile View</h2>
      <form className={styles.formGrid}>
        <div className={`${styles.row} ${styles.rowTwo}`}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Employee Name</label>
            <input
              type="text"
              value={employee.employee_name || ""}
              className={styles.input}
              readOnly
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Contact no</label>
            <input
              type="tel"
              value={employee.contact_no || ""}
              className={styles.input}
              readOnly
            />
          </div>
        </div>
        <div className={`${styles.row} ${styles.rowThree}`}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Date of joining</label>
            <input
              type="date"
              value={
                employee.date_of_joining
                  ? new Date(employee.date_of_joining).toISOString().slice(0, 10)
                  : ""
              }
              className={styles.dateInput}
              readOnly
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Bond Period</label>
            <input
              type="number"
              value={employee.bond_period_number || ""}
              className={styles.input}
              readOnly
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>End of Bond Period</label>
            <input
              type="date"
              value={
                employee.bond_period_date
                  ? new Date(employee.bond_period_date).toISOString().slice(0, 10)
                  : ""
              }
              className={styles.dateInput}
              readOnly
            />
          </div>
        </div>
        <div className={`${styles.row} ${styles.rowTwo}`}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              value={employee.email || ""}
              className={styles.input}
              readOnly
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Adharcard No</label>
            <input
              type="text"
              value={employee.adharcard_no || ""}
              className={styles.input}
              readOnly
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Salary</label>
            <input
              type="number"
              value={employee.salary || ""}
              className={styles.input}
              readOnly
            />
          </div>
        </div>
        <div className={styles.locationSection}>
          <div className={styles.addressField}>
            <label className={styles.label}>Residential Address</label>
            <textarea
              value={employee.residential_address || ""}
              className={styles.textArea}
              rows={3}
              readOnly
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmployeeProfileView;
