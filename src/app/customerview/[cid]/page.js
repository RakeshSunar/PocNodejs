"use client";
import CustomerDetailsView from '@/components/customer/customerDetailView'
import React, { useEffect, useState, use } from 'react'
import { getCookieValue } from '../../../../utils/getCookie';
import axios from 'axios';

 function page(propsPromise) {
  // const cid = await params.cid
  const [cid,setCid] = useState()
  // console.log(propsPromise,"propsPromise")
  const params  = use(propsPromise.params);
    const [customerData, setCustomerData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  // console.log(params,"params.cid")
    useEffect(() => {
    const fetchData = async () => {
      let customerId = await params.cid;
      setCid(customerId);
      try {
        const token = getCookieValue("token");
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/customers/${params.cid}`, {
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
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/transactions/${params.cid}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setTransactions(res.data); // adjust based on response // adjust based on response
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };



fetchTransactionData()

    fetchData();
  }, []);
  // console.log(customerData,"customerData from page")
  return (
    <>
    {customerData && <CustomerDetailsView customerData={customerData} customerId={params.cid} transactions={transactions}/>}
    </>
  )
}

export default page