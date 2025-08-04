"use client";
import React, { useEffect, useState, use } from 'react'
import styles from '@/components/customer/CustomerDetails.module.css'
import axios from 'axios';
import { getCookieValue } from '../../../../utils/getCookie';
import  Link  from 'next/link';


 function CustomerServiceRecordview(propsPromise) {
  const params  = use(propsPromise.params);
    const [customerData, setCustomerData] = useState({
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


    });
  const [service, setService] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
        try {
            const token = getCookieValue("token");
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/customers/${params.scid}`, {
            headers: { Authorization: `Bearer ${token}` }
            });

            setCustomerData(res.data); // adjust based on response 
        } catch (error) {
            console.error('Error fetching customer data:', error);
        }
        };

        const fetchTransactionData = async () => {
        try {
            const token = getCookieValue("token");
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/services/${params.scid}`, {
            headers: { Authorization: `Bearer ${token}` }
            });

            console.log("customerservicerecordview page services-- ",res.data)

            setService(res.data); // adjust based on response // adjust based on response
        } catch (error) {
            console.error('Error fetching customer data:', error);
        }
        };

        fetchData();
        fetchTransactionData()

  }, []);

  const handleDelete = (id) =>{
      try {
        const token = getCookieValue("token");
        axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/services/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if(typeof window !== 'undefined'){
          window.location.reload();
        }
      } catch (error) {
        console.error('Error deleting Service record:', error);
      }
  }

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
                <th>Date Of Service</th>
                <th>Operator Name</th>
                <th>Other Operator</th>
                <th>Purpose</th>
                <th>Classification</th>
                <th>Next Service Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {service.map((service,i) => (
                <tr key={i}>
                  <td>{service.date_of_service.split('T')[0]}</td>
                  <td>{service.operator_name === "External Operator" ? "-" :  service.operator_name}</td>
                  <td>{service.other_operator_name || ''}</td>
                  <td>{service.purpose}</td>
                  <td>{service.classification === "" ? "NA" : service.classification}</td>
                  <td>{service.next_service_date.split('T')[0]}</td>
                  <td>
                    <Link href={`/customerservicerecordedit/${params.scid}-${service.id}`} >
                      <span >Edit</span>
                    </Link>
                    <button onClick={()=>handleDelete(service.id)} >Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <br />
        <center>
          <Link href={`/addcustomerservicerecord/${params.scid}`} className={styles.btn_primary}>
            Add New Record
          </Link>
        </center>
      </div>
  );
}

export default CustomerServiceRecordview