"use client";
import React, { useEffect, useState } from "react";
import styles from "../../../components/employee/addEmployee/addEmployee.module.css";
import axios from "axios";
import { getCookieValue } from "../../../../utils/getCookie";

const UpdateEmployeePage = ({ params }) => {
  const { id: employeeId } = React.use(params);
  const [formData, setFormData] = useState({
    name: "",
    contact_no: "",
    date_of_joining: "",
    bond_period_number: "",
    bond_period_date: "",
    email: "",
    adharcard_no: "",
    salary: "",
    residential_address: "",
  });
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
        const emp = response.data[0];
        // Helper to format date as YYYY-MM-DD
        const formatDate = (dateStr) => {
          if (!dateStr) return "";
          const d = new Date(dateStr);
          if (isNaN(d)) return "";
          return d.toISOString().slice(0, 10);
        };
        setFormData({
          name: emp?.employee_name || "",
          contact_no: emp?.contact_no || "",
          date_of_joining: formatDate(emp?.date_of_joining),
          bond_period_number: emp?.bond_period_number || "",
          bond_period_date: formatDate(emp?.bond_period_date),
          email: emp?.email || "",
          adharcard_no: emp?.adharcard_no || "",
          salary: emp?.salary || "",
          residential_address: emp?.residential_address || "",
        });
      } catch (error) {
        console.error("Failed to fetch employee:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [employeeId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = getCookieValue("token");
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/employees/${employeeId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("✅ Employee updated successfully!");
      }
    } catch (error) {
      console.error("❌ Update failed:", error.response?.data || error);
      alert("Update failed. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Update Employee information</h2>
      <form onSubmit={handleUpdate} className={styles.formGrid}>
        {/* Name and Contact Row */}
        <div className={`${styles.row} ${styles.rowTwo}`}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Employee Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter employee name"
              className={styles.input}
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Contact no</label>
            <input
              type="tel"
              name="contact_no"
              value={formData.contact_no}
              onChange={handleInputChange}
              placeholder="+12-345 678 910"
              className={styles.input}
            />
          </div>
        </div>
        {/* Date, Contract Period, End Date Row */}
        <div className={`${styles.row} ${styles.rowThree}`}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Date of joining</label>
            <input
              type="date"
              name="date_of_joining"
              value={formData.date_of_joining}
              onChange={handleInputChange}
              className={styles.dateInput}
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Bond Period</label>
            <input
              type="number"
              name="bond_period_number"
              value={formData.bond_period_number}
              onChange={handleInputChange}
              placeholder="No."
              className={styles.input}
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>End of Bond Period</label>
            <input
              type="date"
              name="bond_period_date"
              value={formData.bond_period_date}
              onChange={handleInputChange}
              className={styles.dateInput}
            />
          </div>
        </div>
        {/* Email and Aadhar + Salary Row */}
        <div className={`${styles.row} ${styles.rowTwo}`}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="abc@company.com"
              className={styles.input}
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Adharcard No</label>
            <input
              type="text"
              name="adharcard_no"
              value={formData.adharcard_no}
              onChange={handleInputChange}
              placeholder="1234-5678-9012"
              className={styles.input}
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Salary</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              placeholder="e.g. 35000"
              className={styles.input}
            />
          </div>
        </div>
        {/* Location Section */}
        <div className={styles.locationSection}>
          <div className={styles.addressField}>
            <label className={styles.label}>Residential Address</label>
            <textarea
              name="residential_address"
              value={formData.residential_address}
              onChange={handleInputChange}
              placeholder="Enter your home address"
              className={styles.textArea}
              rows={3}
            />
          </div>
        </div>
        {/* Update Button */}
        <button type="submit" className={styles.saveButton}>
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateEmployeePage;
