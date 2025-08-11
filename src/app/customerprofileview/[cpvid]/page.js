"use client"


import React, { use,useEffect,useState } from 'react'
import styles from "../../../components/employee/addEmployee/addEmployee.module.css";
import styless from"@/components/customer/addCustomer/addCustomer.module.css"
import transactionStyles from "@/components/customer/CustomerDetails.module.css"
import { getCookieValue } from '../../../../utils/getCookie';
import axios from 'axios';

function CustomerProfileViewPage(propsPromise) {
    // This page is for viewing customer profile details
    const params  = use(propsPromise.params);
    const [activeTab, setActiveTab] = useState("Customer Details");
    const [showServiceDetails, setShowServiceDetails] = useState(false);
    const [showTransactionDetails, setShowTransactionDetails] = useState(false);

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

  const [service, setService] = useState([{
    date_of_service:"",
    operator_name: "",
    other_operator_name: "",
    purpose: "",
    classification: "",
    next_service_date: "",

  }]);

  const [transactions, setTransactions] = useState([{
    TransactionId: "",       
    TransactionDate: "",
    TransactionType: "",
    TransactionAmount: "",
    PaymentDate: "",
    PaymentMethod: "",
    PaymentStatus: "",
    NextInstallmentDate: "",
    Purpose: "",
  }]);

      const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowServiceDetails(false);
    setShowTransactionDetails(false);
  };
   const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  //  const handleCheckboxChange = (e) => {
  //   const { name, checked } = e.target
  //   setFormData((prev) => ({
  //     ...prev,
  //     type_of_treatment: {
  //       ...prev.type_of_treatment,
  //       [name]: checked,
  //     },
  //   }))
  // }

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

    const fetchCustomerData = async () => {
   try {
     const token = getCookieValue("token");
     const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/customers/${params.cpvid}`, {
       headers: { Authorization: `Bearer ${token}` }
     });

     const apiData = res.data;


    // Convert treatment strings to boolean object
    const labelToKey = {
      "Termite Control": "termiteControl",
      "General Disinfection": "generalDisinfection",
      "Wood Borer": "woodBorer",
      "Bed Bugs": "bedBugs",
      "Rodent Control": "rodentControl",
      "Bird Netting & Spikestrol": "birdNettingSpikestrol"
    };

    const treatmentObject = {
      termiteControl: false,
      generalDisinfection: false,
      woodBorer: false,
      bedBugs: false,
      rodentControl: false,
      birdNettingSpikestrol: false
    };

    if (Array.isArray(apiData.type_of_treatment)) {
      apiData.type_of_treatment.forEach(label => {
        const key = labelToKey[label];
        if (key) treatmentObject[key] = true;
      });
    }

    // Final formData
    setFormData({
      ...apiData,
      type_of_treatment: treatmentObject
    });
   } catch (error) {
     console.error('Error fetching customer data:', error);
   }
 };

  const fetchServiceData = async () => {
        try {
            const token = getCookieValue("token");
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/services/${params.cpvid}`, {
            headers: { Authorization: `Bearer ${token}` }
            });

            setService(res.data); // adjust based on response // adjust based on response
        } catch (error) {
            console.error('Error fetching customer data:', error);
        }
        };

  const fetchTransactionData = async () => {
      try {
        const token = getCookieValue("token");
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/transactions/${params.cpvid}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setTransactions(res.data); // adjust based on response 
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };
  useEffect(() => {
    fetchCustomerData()
    fetchServiceData()
    fetchTransactionData()
  }, [])

  return (
     <div className={styles.container}>
      <div className={styles.tabs}>
        {["Customer Details", "Services", "Transaction"].map((tab) => (
          <button
            key={tab}
            className={`${styles.tabButton} ${
              activeTab === tab ? styles.activeTab : ""
            }`}
            onClick={() => handleTabChange(tab)}
          >
            {tab.charAt(0).toUpperCase() +
              tab
                .slice(1)
                .replace("employee", "Employee Record")
                .replace("advance", "Advance Details")
                .replace("leave", "Leave Details")
                .replace("salary", "Salary Details")}
          </button>
        ))}
      </div>
      {activeTab === "Customer Details" && (
        <>
        
          <h1>Customer information</h1>

          <div className={styless.container}>
        <form  className={styless.formGrid}>
          {/* Name and Contact Row */}
          <div className={`${styless.row} ${styless.rowTwo}`}>
            <div className={styless.fieldGroup}>
              <label className={styless.label}>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter customer name"
                className={styless.input}
              />
            </div>
            <div className={styless.fieldGroup}>
              <label className={styless.label}>Contact no</label>
              <input
                type="tel"
                name="contact_no"
                value={formData.contact_no}
                onChange={handleInputChange}
                placeholder="+12-345 678 910"
                className={styless.input}
              />
            </div>
          </div>

          {/* Date, Contract Period, End Date Row */}
          <div className={`${styless.row} ${styless.rowThree}`}>
            <div className={styless.fieldGroup}>
              <label className={styless.label}>Date of Registration</label>
              <input
                type="date"
                name="date_of_registration"
                value={formData.date_of_registration.split('T')[0]}
                onChange={handleInputChange}
                className={styless.dateInput}
              />
            </div>
            <div className={styless.fieldGroup}>
              <label className={styless.label}>Contract Period</label>
              <input
                type="number"
                name="contract_period"
                value={formData.contract_period}
                onChange={handleInputChange}
                placeholder="No."
                className={styless.input}
              />
            </div>
            <div className={styless.fieldGroup}>
              <label className={styless.label}>End Date of Contract</label>
              <input
                type="date"
                name="end_date_of_contract"
                value={formData.end_date_of_contract.split('T')[0]}
                onChange={handleInputChange}
                className={styless.dateInput}
              />
            </div>
          </div>

          {/* Email and Total Amount Row */}
          <div className={`${styless.row} ${styless.rowTwo}`}>
            <div className={styless.fieldGroup}>
              <label className={styless.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="abc@company.com"
                className={styless.input}
              />
            </div>
            <div className={styless.fieldGroup}>
              <label className={styless.label}>Total Amount</label>
              <input
                name="total_amount"
                value={formData.total_amount}
                onChange={handleInputChange}
                className={styless.select}
              />
            </div>
          </div>

          {/* Type of Treatment Section */}
          <div className={styless.treatmentSection}>
            <h3 className={styless.treatmentTitle}>Type of Treatment</h3>

            <div className={styless.selectedTreatment}>{getSelectedTreatments()}</div>
          </div>

          {/* Location Section */}
          <div className={styless.locationSection}>
            <h3 className={styless.locationTitle}>Location</h3>

            <div className={styless.addressField}>
              <label className={styless.label}>Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your home address"
                className={styless.textArea}
                rows={3}
              />
            </div>
          </div>

        </form>
        </div>
        
        </>
      )}

      {activeTab === "Services" && (
        <>
         <div className={transactionStyles.table_responsive}>
          <table className={transactionStyles.table}>
            <thead className={transactionStyles.thead_dark}>
              <tr>
                <th>Date Of Service</th>
                <th>Operator Name</th>
                <th>Other Operator</th>
                {/* <th>Purpose</th> */}
                {/* <th>Classification</th> */}
                <th>Next Service Date</th>
                {/* <th>Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {service.map((service,i) => (
                <tr key={i}>
                  <td>{service.date_of_service.split('T')[0]}</td>
                  <td>{service.operator_name === "External Operator" ? "-" :  service.operator_name}</td>
                  <td>{service.other_operator_name || ''}</td>
                  {/* <td>{service.purpose}</td> */}
                  {/* <td>{service.classification === "" ? "NA" : service.classification}</td> */}
                  <td>{service.next_service_date?service.next_service_date.split('T')[0] : null}</td>
                  {/* <td>
                    <Link href={`/customerservicerecordedit/${params.scid}-${service.id}`} >
                      <span >Edit</span>
                    </Link>
                    <button onClick={()=>handleDelete(service.id)} >Delete</button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
      )}

      {activeTab === "Transaction" && (
        <>
         <h2>Transaction Details</h2>
          <div className={transactionStyles.table_responsive}>
          <table className={transactionStyles.table}>
            <thead className={transactionStyles.thead_dark}>
              <tr>
                <th>Transaction ID</th>
                <th>Amount</th>
                <th>Date of Payment</th>
                <th>Purpose</th>
                <th>Next Installment Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn,i) => (
                <tr key={i}>
                  <td>{txn.TransactionId}</td>
                  <td>{txn.TransactionAmount}</td>
                  <td>{txn.PaymentDate.split('T')[0]}</td>
                  <td>{txn.Purpose}</td>
                  <td>{txn.NextInstallmentDate?txn.NextInstallmentDate.split('T')[0] : null}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
      )}

    </div>
  )
}

export default CustomerProfileViewPage