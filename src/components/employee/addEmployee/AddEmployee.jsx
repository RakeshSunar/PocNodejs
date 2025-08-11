"use client";
import { useState } from "react";
import styles from "./addEmployee.module.css";
import axios from "axios";
import { getCookieValue } from "../../../../utils/getCookie";

export default function AddEmployee() {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if(e.target.name === "bond_period_number"){
      const numericValue = Number(value);
      if(formData.date_of_joining !== ""){
        // console.log(formData.date_of_registration,"formData.date_of_registration");
        const dateObj = new Date(formData.date_of_joining);
      dateObj.setMonth(dateObj.getMonth() + numericValue);
      // console.log(value,"<=== value")
      // console.log(dateObj.toISOString().split("T")[0],'<=== dateObj.toISOString().split("T")[0]')
      setFormData((prev) => ({
      ...prev,
      ["bond_period_date"]: dateObj.toISOString().split("T")[0],
    }))
      }else{
        return
      }
    }
    if(e.target.name === "date_of_joining"){
      if(formData.bond_period_number !== ""){
        const numericValue = Number(formData.bond_period_number);
        const dateObj = new Date(value);
      dateObj.setMonth(dateObj.getMonth() + numericValue);
      setFormData((prev) => ({
      ...prev,
      ["bond_period_date"]: dateObj.toISOString().split("T")[0],
    }))
      }else{
        return
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     try {
    const token = getCookieValue("token");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/employees`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert("✅ Employee added successfully!");
        setFormData({
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
      }
    } catch (error) {
      console.error("❌ Submission failed:", error.response?.data || error);
      alert("Submission failed. Please try again.");
    }
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Employee information</h2>
      <form onSubmit={handleSubmit} className={styles.formGrid}>
        {/* Name and Contact Row */}
        <div className={`${styles.row} ${styles.rowTwo}`}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Employee Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter customer name"
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
            <label className={styles.label}>Bond Period (months)</label>
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

        {/* Save Button */}
        <button type="submit" className={styles.saveButton}>
          Save all
        </button>
      </form>
    </div>
  );
}
