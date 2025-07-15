"use client";
import CustomerDetailsView from '@/components/customer/customerDetailView'
import React, { useEffect, useState, use } from 'react'
import { getCookieValue } from '../../../../utils/getCookie';
import axios from 'axios';

 function page(propsPromise) {
  const params  = use(propsPromise.params);
    const [customerData, setCustomerData] = useState([]);
  const [transactions, setTransactions] = useState([]);
    useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, []);
  return (
    <>
    {customerData && <CustomerDetailsView customerData={customerData} customerId={params.cid}/>}
    </>
  )
}

export default page