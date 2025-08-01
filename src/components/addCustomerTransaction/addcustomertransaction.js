import React, { useState } from 'react'

import styles from '@/components/customer/CustomerDetails.module.css'
import { getCookieValue } from '../../../utils/getCookie'
import axios from 'axios'
import { useRouter } from 'next/navigation'

function AddCustomerTransaction({customerData,cutomerId}) {
    const [TransactionData,setTransactionData] =useState({
        TransactionAmount:0,
        Purpose:"",
        NextInstallmentDate:"",
    })

    console.log("TransactionData",TransactionData)
    const router = useRouter();


      const handleInputChange = (e) => {
    const { name, value } = e.target
    setTransactionData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

    const handlesubmit = async (e) =>{
        e.preventDefault();


        try{
            const token =getCookieValue("token")

            // ✅ If date is empty, set it to today's date in YYYY-MM-DD format
            const today = new Date();
            const formattedToday = today.toISOString().split("T")[0]; // "YYYY-MM-DD"
            const formattedData = {
            TransactionAmount: Number(TransactionData.TransactionAmount),
            Purpose: TransactionData.Purpose,
            NextInstallmentDate: TransactionData.NextInstallmentDate || formattedToday,
            };

            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/transactions/${cutomerId}`,formattedData,
                {headers:{Authorization:`Bearer ${token}`,
            }})

            if (res.status === 200 || res.status === 201) {
                alert("✅ Customer data submitted successfully!");
                router.back(); // ✅ Go to previous page
            }
            setTransactionData({TransactionAmount:"",Purpose:"",NextInstallmentDate:""})

        }catch (error){

            console.error("❌ Submission failed:", error.res?.data || error);
        }


    }
  return (
    <div className={styles.AddCustomerTransactionWrapper}>
     <div className={styles.card}>
            <h2 >Add Transaction Details </h2>
            <form method="POST" onSubmit={handlesubmit }>
              <div className={styles.input_wrapper}>
                <div className={styles.input_container}>
                  <label htmlFor="name">Name</label>
                  <input
                    className={styles.form_control}
                    id="name"
                    type="text"
                    value={customerData.name}
                    readOnly
                  />
                </div>
                <div className={styles.input_container}>
                  <label htmlFor="phone">Contact No</label>
                  <input
                    className={styles.form_control}
                    id="phone"
                    type="number"
                    value={customerData.contact_no}
                    readOnly
                  />
                </div>
                <div className={styles.input_container}>
                  <label htmlFor="phone">Enter Amount</label>
                  <input
                    className={styles.form_control}
                    id="TransactionAmount"
                    name='TransactionAmount'
                    type="number"
                    value={TransactionData.TransactionAmount}
                    onChange={handleInputChange}
                  />
                </div>

                <select id="Purpose"  name='Purpose' value={TransactionData.Purpose} className={styles.form_control} onChange={handleInputChange}>
                    <option value="" disabled>-- Select Purpose --</option>
                    <option>Full Payment</option>
                    <option>Part Payment</option>
                    <option>Additional Service Charge</option>
                </select>


                {TransactionData.Purpose === 'Part Payment' && (
  <div className={styles.input_container}>
    <label htmlFor="NextInstallmentDate">Next emi date</label>
    <input
      className={styles.form_control}
      id="NextInstallmentDate"
      name="NextInstallmentDate"
      type="date"
      value={TransactionData.NextInstallmentDate}
      onChange={handleInputChange}
    />
  </div>
)}


              <button  type='submit' className={styles.submitButton}>Submit</button>
              </div>
            </form>
     </div>
    </div>
  )
}

export default AddCustomerTransaction