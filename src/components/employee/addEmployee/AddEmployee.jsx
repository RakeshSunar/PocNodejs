"use client"
import { useState } from "react"
import styles from "./addEmployee.module.css"

export default function AddEmployee() {
  const [formData, setFormData] = useState({
    name: "",
    contactNo: "",
    dateOfRegistration: "",
    contractPeriod: "",
    endDateOfContract: "",
    email: "",
    totalAmount: "",
    treatments: {
      termiteControl: false,
      generalDisinfection: false,
      woodBorer: false,
      bedBugs: false,
      rodentControl: false,
      birdNettingSpikestrol: false,
    },
    address: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      treatments: {
        ...prev.treatments,
        [name]: checked,
      },
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission here
  }

  return (
    <div className={styles.container}>
      <h2 class={styles.title}>Employee information</h2>
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
              name="contactNo"
              value={formData.contactNo}
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
              name="dateOfRegistration"
              value={formData.dateOfRegistration}
              onChange={handleInputChange}
              className={styles.dateInput}
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Bond Period</label>
            <input
              type="number"
              name="contractPeriod"
              value={formData.contractPeriod}
              onChange={handleInputChange}
              placeholder="No."
              className={styles.input}
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Bond Period</label>
            <input
              type="date"
              name="endDateOfContract"
              value={formData.endDateOfContract}
              onChange={handleInputChange}
              className={styles.dateInput}
            />
          </div>
        </div>

        {/* Email and Total Amount Row */}
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
              type="number"
              name="text"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="abc@company.com"
              className={styles.input}
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Salary</label>
            <input
              type="number"
              name="text"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="abc@company.com"
              className={styles.input}
            />
          </div>
          
        </div>


        {/* Location Section */}
        <div className={styles.locationSection}>
          {/* <h3 className={styles.locationTitle}>Residential Address</h3> */}

          <div className={styles.addressField}>
            <label className={styles.label}>Residential Address</label>
            <textarea
              name="address"
              value={formData.address}
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
  )
}
