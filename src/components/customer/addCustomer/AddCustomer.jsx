"use client"
import { useState } from "react"
import styles from "./addCustomer.module.css"
import axios from "axios"
import { getCookieValue } from "../../../../utils/getCookie"
import { useRouter } from "next/navigation"

export default function AddCustomer() {
  const [formData, setFormData] = useState({
    name: "",
    contact_no: "",
    date_of_registration: "",
    contract_period: "",
    end_date_of_contract: "",
    email: "",
    total_amount: "",
    type_of_treatment: {
      termiteControl: false,
      generalDisinfection: false,
      woodBorer: false,
      bedBugs: false,
      rodentControl: false,
      birdNettingSpikestrol: false,
    },

    // selectedTreatments: [],
    address: "",
  })
const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if(e.target.name === "contract_period"){
      const numericValue = Number(value);
      if(formData.date_of_registration !== ""){
        // console.log(formData.date_of_registration,"formData.date_of_registration");
        const dateObj = new Date(formData.date_of_registration);
      dateObj.setMonth(dateObj.getMonth() + numericValue);
      // console.log(value,"<=== value")
      // console.log(dateObj.toISOString().split("T")[0],'<=== dateObj.toISOString().split("T")[0]')
      setFormData((prev) => ({
      ...prev,
      ["end_date_of_contract"]: dateObj.toISOString().split("T")[0],
    }))
      }else{
        return
      }
    }
    if(e.target.name === "date_of_registration"){
      if(formData.contract_period !== ""){
        const numericValue = Number(formData.contract_period);
        const dateObj = new Date(value);
      dateObj.setMonth(dateObj.getMonth() + numericValue);
      setFormData((prev) => ({
      ...prev,
      ["end_date_of_contract"]: dateObj.toISOString().split("T")[0],
    }))
      }else{
        return
      }
    }
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      type_of_treatment: {
        ...prev.type_of_treatment,
        [name]: checked,
      },
    }))
  }

  const getSelectedTreatments = () => {

    const selected = Object.entries(formData.type_of_treatment)
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

    return selected.length > 0 ? selected.join(",") : "Selected treatment will visible here"
  }

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.contact_no.trim()) newErrors.contact_no = "Contact number is required";
    if (!formData.date_of_registration) newErrors.date_of_registration = "Date of registration is required";
    if (!formData.contract_period) newErrors.contract_period = "Contract period is required";
    if (!formData.end_date_of_contract) newErrors.end_date_of_contract = "End date is required";
    if (!formData.total_amount) newErrors.total_amount = "Total amount is required";
    if (
      !Object.values(formData.type_of_treatment).some((v) => v)
    ) {
      newErrors.type_of_treatment = "Select at least one treatment";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
      return; // Stop submission if invalid
    }

  // Convert treatment object to array of selected treatment names
  const selectedTreatments = Object.entries(formData.type_of_treatment)
    .filter(([_, isSelected]) => isSelected)
    .map(([treatment]) => {
      switch (treatment) {
        case "termiteControl":
          return "Termite Control";
        case "generalDisinfection":
          return "General Disinfection";
        case "woodBorer":
          return "Wood Borer";
        case "bedBugs":
          return "Bed Bugs";
        case "rodentControl":
          return "Rodent Control";
        case "birdNettingSpikestrol":
          return "Bird Netting & Spikestrol";
        default:
          return null;
      }
    })
    .filter(Boolean); // Remove nulls

  // Prepare final data
  const dataToSubmit = {
    ...formData,
    type_of_treatment: selectedTreatments, // ✅ array of strings
  };

  try {
    const token = getCookieValue("token");
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/customers`,
      dataToSubmit,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      alert("✅ Customer data submitted successfully!");
       // Reset the form
  setFormData({
    name: "",
    contact_no: "",
    date_of_registration: "",
    contract_period: "",
    end_date_of_contract: "",
    email: "",
    total_amount: "",
    type_of_treatment: {
      termiteControl: false,
      generalDisinfection: false,
      woodBorer: false,
      bedBugs: false,
      rodentControl: false,
      birdNettingSpikestrol: false,
    },
    address: "",
  });

  setErrors({});
      // Redirect to the home page
      router.push('/'); 
      
    }
  } catch (error) {
    console.error("❌ Submission failed:", error.response?.data || error);
  }
};

  

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
            {errors.name && <p className={styles.error}>{errors.name}</p>}
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
            {errors.contact_no && <p className={styles.error}>{errors.contact_no}</p>}
          </div>
        </div>

        {/* Date, Contract Period, End Date Row */}
        <div className={`${styles.row} ${styles.rowThree}`}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Date of Registration</label>
            <input
              type="date"
              name="date_of_registration"
              value={formData.date_of_registration}
              onChange={handleInputChange}
              className={styles.dateInput}
            />
            {errors.date_of_registration && <p className={styles.error}>{errors.date_of_registration}</p>}
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Contract Period (months)</label>
            <input
              type="number"
              name="contract_period"
              value={formData.contract_period}
              onChange={handleInputChange}
              placeholder="No."
              className={styles.input}
            />
            {errors.contract_period && <p className={styles.error}>{errors.contract_period}</p>}
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>End Date of Contract</label>
            <input
              type="date"
              name="end_date_of_contract"
              value={formData.end_date_of_contract}
              onChange={handleInputChange}
              className={styles.dateInput}
            />
            {errors.end_date_of_contract && <p className={styles.error}>{errors.end_date_of_contract}</p>}
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
            <input
              name="total_amount"
              value={formData.total_amount}
              onChange={handleInputChange}
              className={styles.select}
            />
            {errors.total_amount && <p className={styles.error}>{errors.total_amount}</p>}
          </div>
        </div>

        {/* Type of Treatment Section */}
        <div className={styles.treatmentSection}>
          <h3 className={styles.treatmentTitle}>Type of Treatment</h3>

          <div className={styles.selectedTreatment}>{getSelectedTreatments()}</div>
          {errors.type_of_treatment && <p className={styles.error}>{errors.type_of_treatment}</p>}

          <div className={styles.checkboxGrid}>
            <div className={styles.checkboxItem}>
              <input
                type="checkbox"
                id="termiteControl"
                name="termiteControl"
                checked={formData.type_of_treatment.termiteControl}
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
                checked={formData.type_of_treatment.generalDisinfection}
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
                checked={formData.type_of_treatment.woodBorer}
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
                checked={formData.type_of_treatment.bedBugs}
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
                checked={formData.type_of_treatment.rodentControl}
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
                checked={formData.type_of_treatment.birdNettingSpikestrol}
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
             {errors.address && <p className={styles.error}>{errors.address}</p>}
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
