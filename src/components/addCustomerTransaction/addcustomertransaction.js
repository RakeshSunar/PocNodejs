import React from 'react'

import styles from '@/components/customer/CustomerDetails.module.css'
import { getCookieValue } from '../../../utils/getCookie';
import { useRouter } from 'next/navigation';
import axios from 'axios';

function AddCustomerTransaction({customerData}) {
  const router = useRouter();

  const [transactionsData, setTransactionData] = React.useState({
    TransactionAmount: 0,
    Purpose: "",
    PaymentDate: "",
    NextInstallmentDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransactionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
        try{
        const token =getCookieValue("token")
        // ✅ If date is empty, set it to today's date in YYYY-MM-DD format
            const today = new Date();
            const formattedToday = today.toISOString().split("T")[0]; // "YYYY-MM-DD"
            // Function to add months
            const addMonths = (date, months) => {
              const d = new Date(date);
              d.setMonth(d.getMonth() + months);
              return d.toISOString().split("T")[0];
            };
            const formattedData = {
            TransactionAmount: Number(transactionsData.TransactionAmount),
            Purpose: transactionsData.Purpose,
            PaymentDate:transactionsData.PaymentDate ? transactionsData.PaymentDate.split("T")[0] : formattedToday,
            NextInstallmentDate: transactionsData.NextInstallmentDate ? transactionsData.NextInstallmentDate.split("T")[0] : addMonths(formattedToday, 3),
            };
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/transactions/${customerData.id}`, formattedData,
                {headers:{Authorization:`Bearer ${token}`,
            }})
        //  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/transactions/${params.eid}`,formattedData,
        //         {headers:{Authorization:`Bearer ${token}`,
        //     }})
            
            if (response.status === 200 || response.status === 201) {
                alert("✅ Customer data updated successfully!");
                router.back(); // ✅ Go to previous page
            }
            setTransactionData({TransactionAmount:"",Purpose:"",PaymentDate:"",NextInstallmentDate:""})
    }catch (error){

        console.error("❌ Submission failed:", error.response?.data || error);
    }


  }
  return (
    <div className={styles.AddCustomerTransactionWrapper}>
     <div className={styles.card}>
            <h2 >Add Transaction Details </h2>
            <form method="POST" onSubmit={handleSubmit} >
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
                    id="enterAmount"
                    type="number"
                    name='TransactionAmount'
                    value={transactionsData.TransactionAmount}
                    // value={customerData.contact_no}
                    // readOnly
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
                        value={transactionsData.PaymentDate}
                        onChange={handleInputChange}
                        />
                    </div>

                <select id="purpose" className={styles.form_control} name='Purpose' value={transactionsData.Purpose} onChange={handleInputChange}>
                    <option>Full Payment</option>
                    <option>Part Payment</option>
                    <option>Additional Service Charge</option>
                </select>
                {transactionsData.Purpose === 'Part Payment' && (
                    <div className={styles.input_container}>
                        <label htmlFor="NextInstallmentDate">Next Installment Date</label>
                        <input
                        className={styles.form_control}
                        id="NextInstallmentDate"
                        type="date"
                        name='NextInstallmentDate'
                        value={transactionsData.NextInstallmentDate}
                        onChange={handleInputChange}
                        />
                    </div>
                )}


              <button type='submit' className={styles.submitButton}>Submit</button>
              </div>
            </form>
     </div>
    </div>
  )
}

export default AddCustomerTransaction