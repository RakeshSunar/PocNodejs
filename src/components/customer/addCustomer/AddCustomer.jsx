"use client"
import { useState } from "react"
import styles from "./addCustomer.module.css"

export default function AddCustomer() {
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

  const getSelectedTreatments = () => {
    const selected = Object.entries(formData.treatments)
      .filter(([_, isSelected]) => isSelected)
      .map(([treatment, _]) => {
        switch (treatment) {
          case "termiteControl":
            return "Termite Control"
          case "generalDisinfection":
            return "General Disinfection"
          case "woodBorer":
            return "Wood Borer"
          case "bedBugs":
            return "Bed Bugs"
          case "rodentControl":
            return "Rodent Control"
          case "birdNettingSpikestrol":
            return "Bird Netting & Spikestrol"
          default:
            return ""
        }
      })

    return selected.length > 0 ? selected.join(", ") : "Selected treatment will visible here"
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission here
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.formGrid}>
        {/* Name and Contact Row */}
        <div className={`${styles.row} ${styles.rowTwo}`}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Name</label>
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
            <label className={styles.label}>Date of Registration</label>
            <input
              type="date"
              name="dateOfRegistration"
              value={formData.dateOfRegistration}
              onChange={handleInputChange}
              className={styles.dateInput}
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Contract Period</label>
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
            <label className={styles.label}>End Date of Contract</label>
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
            <label className={styles.label}>Total Amount</label>
            <select
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleInputChange}
              className={styles.select}
            >
              <option value="">No.</option>
              <option value="5000">₹5,000</option>
              <option value="10000">₹10,000</option>
              <option value="15000">₹15,000</option>
              <option value="20000">₹20,000</option>
              <option value="25000">₹25,000</option>
            </select>
          </div>
        </div>

        {/* Type of Treatment Section */}
        <div className={styles.treatmentSection}>
          <h3 className={styles.treatmentTitle}>Type of Treatment</h3>

          <div className={styles.selectedTreatment}>{getSelectedTreatments()}</div>

          <div className={styles.checkboxGrid}>
            <div className={styles.checkboxItem}>
              <input
                type="checkbox"
                id="termiteControl"
                name="termiteControl"
                checked={formData.treatments.termiteControl}
                onChange={handleCheckboxChange}
                className={styles.checkbox}
              />
              <label htmlFor="termiteControl" className={styles.checkboxLabel}>
                Termite Control
              </label>
            </div>

            <div className={styles.checkboxItem}>
              <input
                type="checkbox"
                id="generalDisinfection"
                name="generalDisinfection"
                checked={formData.treatments.generalDisinfection}
                onChange={handleCheckboxChange}
                className={styles.checkbox}
              />
              <label htmlFor="generalDisinfection" className={styles.checkboxLabel}>
                General Disinfection
              </label>
            </div>

            <div className={styles.checkboxItem}>
              <input
                type="checkbox"
                id="woodBorer"
                name="woodBorer"
                checked={formData.treatments.woodBorer}
                onChange={handleCheckboxChange}
                className={styles.checkbox}
              />
              <label htmlFor="woodBorer" className={styles.checkboxLabel}>
                Wood Borer
              </label>
            </div>

            <div className={styles.checkboxItem}>
              <input
                type="checkbox"
                id="bedBugs"
                name="bedBugs"
                checked={formData.treatments.bedBugs}
                onChange={handleCheckboxChange}
                className={styles.checkbox}
              />
              <label htmlFor="bedBugs" className={styles.checkboxLabel}>
                Bed Bugs
              </label>
            </div>

            <div className={styles.checkboxItem}>
              <input
                type="checkbox"
                id="rodentControl"
                name="rodentControl"
                checked={formData.treatments.rodentControl}
                onChange={handleCheckboxChange}
                className={styles.checkbox}
              />
              <label htmlFor="rodentControl" className={styles.checkboxLabel}>
                Rodent Control
              </label>
            </div>

            <div className={styles.checkboxItem}>
              <input
                type="checkbox"
                id="birdNettingSpikestrol"
                name="birdNettingSpikestrol"
                checked={formData.treatments.birdNettingSpikestrol}
                onChange={handleCheckboxChange}
                className={styles.checkbox}
              />
              <label htmlFor="birdNettingSpikestrol" className={styles.checkboxLabel}>
                Bird Netting & Spikestrol
              </label>
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className={styles.locationSection}>
          <h3 className={styles.locationTitle}>Location</h3>

          <div className={styles.addressField}>
            <label className={styles.label}>Address</label>
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
