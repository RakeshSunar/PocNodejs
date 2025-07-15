'use client';

import Link from 'next/link';
import styles from './CustomerDetails.module.css'

export default  function CustomerDetailsView({customerData,customerId}) {

  // const customer = {
  //   name: 'rishi',
  //   contact_no: '9619438148',
  //   type_of_treatment: 'General Disinfestation,',
  //   date_of_registration: '2020-06-06',
  //   contract_period: 1,
  //   end_date_of_contract: '2022-05-27',
  //   total_amount: 10000,
  //   paid: 7500,
  //   remaining: 2500,
  // };



  let transactions = [
    {
      id: 1,
      amount: 5000,
      date_of_payment: 'May 8, 2022',
      purpose: 'Full Payment',
      next_installment_date: 'NA',
    },
    {
      id: 2,
      amount: 2500,
      date_of_payment: 'July 11, 2025',
      purpose: 'Part Payment',
      next_installment_date: '2025-08-31',
    },
  ];

  if (!customerData) return <div>Loading...</div>;
  return (
      <div className={styles.mainWrapper}>
        <div >
          <div className={styles.card}>
            <h2 >Customer information</h2>
            <form method="POST">
              {/* CSRF token would be handled differently in Next.js */}
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
                  <label htmlFor="treatment">Type of Treatment</label>
                  <input
                    className={styles.form_control}
                    id="treatment"
                    type="text"
                    value={customerData.type_of_treatment}
                    readOnly
                  />
                </div>

                <div className={styles.input_container}>
                  <label htmlFor="registration_date">Date of Registration</label>
                  <div className={styles.input_group}>
                    <input
                      name="date_created"
                      value={customerData.date_of_registration?.split("T")[0] || ''}
                      className={styles.form_control}
                      id="registration_date"
                      type="date"
                      placeholder="dd/mm/yyyy"
                      readOnly
                    />
                  </div>
                </div>

                <div className={styles.input_container}>
                  <label htmlFor="contract_period">Contract Period</label>
                  <input
                    className={styles.form_control}
                    id="contract_period"
                    type="number"
                    value={customerData.contract_period}
                    readOnly
                  />
                </div>

                <div className={styles.input_container}>
                  <label htmlFor="end_contract">End Date of Contract</label>
                  <div className={styles.input_group}>
                    {/* <span className={styles.input_group_text}>📅</span> */}
                    <input
                      name="end_date"
                      // value={customerData.end_date_of_contract}
                      value={customerData.end_date_of_contract?.split("T")[0] || ''}
                      className={styles.form_control}
                      id="end_contract"
                      type="date"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <p><b>Total Amount:</b> {customerData.total_amount}</p>
              {/*<p><b>Remaining:</b> {customer.remaining}</p>
              <p><b>Paid:</b> {customer.paid}</p>*/}
            </form>
          </div>
        </div>

        <hr />

        <div className={styles.table_responsive}>
          <table className={styles.table}>
            <thead className={styles.thead_dark}>
              <tr>
                <th>Transaction ID</th>
                <th>Amount</th>
                <th>Date of Payment</th>
                <th>Purpose</th>
                <th>Next Installment Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id}>
                  <td>{txn.id}</td>
                  <td>{txn.amount}</td>
                  <td>{txn.date_of_payment}</td>
                  <td>{txn.purpose}</td>
                  <td>{txn.next_installment_date}</td>
                  <td>
                    <Link href={`/edit/${txn.id}`} >
                      <span >Edit</span>
                    </Link>
                    <Link href={`/delete/${txn.id}`}>Delete</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <br />
        <center>
          <Link href={`/addcustomertransaction/${customerId}`} className={styles.btn_primary}>
            Add New Record
          </Link>
        </center>
      </div>
    
  );
}
