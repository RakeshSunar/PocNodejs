import React from 'react'

import styles from '@/components/customer/CustomerDetails.module.css'

function AddCustomerTransaction({customerData}) {
  return (
    <div className={styles.AddCustomerTransactionWrapper}>
     <div className={styles.card}>
            <h2 >Add Transaction Details </h2>
            <form method="POST">
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
                    // value={customerData.contact_no}
                    readOnly
                  />
                </div>

                <select id="purpose" className={styles.form_control}>
                    <option>Full Payment</option>
                    <option>Part Payment</option>
                    <option>Additional Service Charge</option>
                </select>


              <button type='submit' className={styles.submitButton}>Submit</button>
              </div>
            </form>
     </div>
    </div>
  )
}

export default AddCustomerTransaction