'use client'
import React, { use, useEffect, useState } from 'react'

import styles from '@/components/customer/CustomerDetails.module.css'
import { getCookieValue } from '../../../../utils/getCookie'
import axios from 'axios'
import {useRouter} from 'next/navigation';

function page(propsPromise) {
    const router = useRouter()
     const params  = use(propsPromise.params);
     const [transactionsData,setTransactionData] = useState({ 
           TransactionAmount:0,
        Purpose:"",
        PaymentDate:"",
        NextInstallmentDate:"",})
       const handleInputChange = (e) => {
    const { name, value } = e.target
    setTransactionData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

//   const handlesubmit = async (e) =>{
//         e.preventDefault();

const fetchTransactionData = async() =>{

    try{
        const token =getCookieValue("token")

        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/transactions/getTransaction/${params.eid}`,
            {headers:{Authorization:`Bearer ${token}`,
        }})
        setTransactionData(res.data[0])

    }catch (error){

        console.error("❌ Submission failed:", error.res?.data || error);
    }

}

useEffect(()=>{
fetchTransactionData();
},[])

const onSubmit = async() =>{

    try{
        const token =getCookieValue("token")
        // ✅ If date is empty, set it to today's date in YYYY-MM-DD format
            const today = new Date();
            const formattedToday = today.toISOString().split("T")[0]; // "YYYY-MM-DD"
            let nextServiceDateValue;
             if (transactionsData.Purpose === "Full Payment" || transactionsData.Purpose === "Additional Service Charge") {
             nextServiceDateValue =  null;
            } else if (!nextServiceDateValue) {
              nextServiceDateValue = transactionsData.NextInstallmentDate.split("T")[0];
            }
            const formattedData = {
            TransactionAmount: Number(transactionsData.TransactionAmount),
            Purpose: transactionsData.Purpose,
            PaymentDate:transactionsData.PaymentDate ? transactionsData.PaymentDate.split("T")[0] : formattedToday,
            NextInstallmentDate: nextServiceDateValue,
            };

         const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/transactions/${params.eid}`,formattedData,
                {headers:{Authorization:`Bearer ${token}`,
            }})
            
            if (response.status === 200 || response.status === 201) {
                alert("✅ Customer data updated successfully!");
                router.back(); // ✅ Go to previous page
            }
            setTransactionData({TransactionAmount:"",Purpose:"",NextInstallmentDate:""})

    }catch (error){

        console.error("❌ Submission failed:", error.response?.data || error);
    }

}




    // }
  return (
    <>
   {transactionsData && <div className={styles.AddCustomerTransactionWrapper}>
     <div className={styles.card}>
            <h2 >Add Transaction Details </h2>
            <form method="PUT" onSubmit={onSubmit} >
              <div className={styles.input_wrapper}>
                <div className={styles.input_container}>
                  <label htmlFor="name">Name</label>
                  <input
                    className={styles.form_control}
                    id="name"
                    type="text"
                    value={transactionsData.name}
                    readOnly
                  />
                </div>
                <div className={styles.input_container}>
                  <label htmlFor="phone">Contact No</label>
                  <input
                    className={styles.form_control}
                    id="phone"
                    type="number"
                    value={transactionsData.contact_no}
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
                    value={transactionsData?.TransactionAmount}
                    onChange={handleInputChange}
                  />
                </div>
                 <div className={styles.input_container}>
                        <label htmlFor="PaymentDate">Payment Date</label>
                        <input
                        className={styles.form_control}
                        id="PaymentDate"
                        type="date"
                        name='PaymentDate'
                        value={transactionsData.PaymentDate?.split('T')[0] || ''}
                        onChange={handleInputChange}
                        />
                    </div>

                <select id="Purpose"  name='Purpose' value={transactionsData.Purpose} className={styles.form_control} onChange={handleInputChange}>
                    <option value="" disabled>-- Select Purpose --</option>
                    <option>Full Payment</option>
                    <option>Part Payment</option>
                    <option>Additional Service Charge</option>
                </select>

               {transactionsData.Purpose === 'Part Payment' && (
                    <div className={styles.input_container}>
                        <label htmlFor="NextInstallmentDate">Next emi date</label>
                        <input
                        className={styles.form_control}
                        id="NextInstallmentDate"
                        name='NextInstallmentDate'
                        type="date"
                        value={transactionsData.NextInstallmentDate?.split('T')[0] || ''}
                        onChange={handleInputChange}
                        />
                    </div>
                )}



              <button  type='submit' className={styles.submitButton}>Submit</button>
              </div>
            </form>
     </div>
    </div>}
    </>
  )
}

export default page