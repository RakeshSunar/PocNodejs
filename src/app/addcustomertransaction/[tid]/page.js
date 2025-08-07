'use client'
import AddCustomerTransaction from "@/components/addCustomerTransaction/addcustomertransaction"
import { getCookieValue } from "../../../../utils/getCookie";
import { use, useEffect, useState } from "react";
import axios from "axios";


function page (propsPromise){
    const params  = use(propsPromise.params);
        const [customerData, setCustomerData] = useState([]);
        useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getCookieValue("token");
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/customers/${params.tid}`, {
          headers: { Authorization: `Bearer ${token}` }
        });


        setCustomerData(res.data); // adjust based on response // adjust based on response
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchData();
  }, []);
    return (
   
        <AddCustomerTransaction customerData={customerData}/>
    )

}

export default page