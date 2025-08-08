'use client'
import styles from '@/components/customer/CustomerDetails.module.css'
import { getCookieValue } from "../../../../utils/getCookie";
import { use, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


function page (propsPromise){
    const params  = use(propsPromise.params);
const str = params.cseid.toString();
const customerID = parseInt(str.split("-")[0]); // 17
const serviceID = parseInt(str.split("-")[1]);
        const [customerData, setCustomerData] = useState({
            name: "",
            contact_no: "",
        });

        const [employees, setEmployees] = useState([]);
        const [services, setServices] = useState([{
             operator_id: "",
        other_operator_name: "",
        purpose:"",
        classification: "",
        date_of_service:"",
        next_service_date: "",
        }]);
        useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getCookieValue("token");
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/customers/${customerID}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setCustomerData(res.data); // adjust based on response // adjust based on response
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };
    const fetchEmployeeData = async () => {
      try {
        const token = getCookieValue("token");
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/employees/`, {
          headers: { Authorization: `Bearer ${token}` }
        });


        setEmployees(res.data); // adjust based on response // adjust based on response
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };
    const fetchServiceData = async () => {
      try {
        const token = getCookieValue("token");
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/services/getServices/${serviceID}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setServices(
                { operator_id: "",
                  other_operator_name: "",  
                  purpose: "",  
                  classification: "",  
                  date_of_service: "",  
                  next_service_date: "",
                })

        setServices(res.data); // adjust based on response // adjust based on response
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };
  
    fetchData();
    fetchEmployeeData();
    fetchServiceData()
  }, []);

      // useEffect(()=>{
      //   console.log(services,"servicesservices")
      // },[services])

    const router = useRouter();

  //     const handleInputChange = (e) => {
  //       const { name, value } = e.target
  //       setServices((prev) => ({
  //       ...prev,
  //       [name]: value,
  //       }))
  // }

  const handleInputChange = (e) => {
    debugger;
  const { name, value } = e.target;
  setServices(prev => {
    const updated = [...prev];
    updated[0] = { ...updated[0], [name]: value };
    return updated;
  });
};


    const handlesubmit = async (e) =>{
        e.preventDefault();
        try{
          // debugger
            const token =getCookieValue("token")

            // ✅ If date is empty, set it to today's date in YYYY-MM-DD format
            const today = new Date();
            const formattedToday = today.toISOString().split("T")[0]; // "YYYY-MM-DD"
            const formattedData = {
            customer_id:customerData.id,
            operator_id:services[0].operator_id === "other"? -1: Number(services[0].operator_id),
            other_operator_name: services[0].other_operator_name? services[0].other_operator_name : 'NA',
            purpose: services[0].purpose,
            classification: services[0].classification,
            // date_of_service: services[0].date_of_service,
            date_of_service: services[0].date_of_service.split("T")[0] || formattedToday,
            next_service_date: services[0].next_service_date.split("T")[0] || formattedToday,
            };
            
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/services/${serviceID}`,formattedData,
                {headers:{Authorization:`Bearer ${token}`,
            }})

            if (res.status === 200 || res.status === 201) {
                alert("✅ Customer data submitted successfully!");
                router.back(); // ✅ Go to previous page
            }
            // Reset the form data after submission
            

        }catch (error){

            console.error("❌ Submission failed:", error.res?.data || error);
        }


    }

    return (
   
        <div className={styles.AddCustomerTransactionWrapper}>
     <div className={styles.card}>
            <h2 >Service Details </h2>
            <form method="POST" onSubmit={handlesubmit }>
              <div className={styles.input_wrapper}>
                <div className={styles.input_container}>
                  <label htmlFor="name">Customer Name</label>
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

                <select id="operator_id"  name='operator_id' value={services[0].operator_id} className={styles.form_control} onChange={handleInputChange}> 
                    <option value="" disabled>-- Select Operator Name --</option>

                    {employees.map((item) => (<option key={item.id} value={item.id}>{item.employee_name}</option>))}
                    {/* <option>Rakesh</option>
                    <option>Tejas</option>
                    <option>Kiran</option> */}
                </select>

                {(services[0].operator_id === "-1" || services[0].operator_id === -1 )&& (
                    <div className={styles.input_container}>
                        <label htmlFor="OperatorName">Other Operator name</label>
                        <input
                        className={styles.form_control}
                        id="other_operator_name"
                        name="other_operator_name"
                        type="text"
                        value={services[0].other_operator_name}
                        onChange={handleInputChange}
                        />
                    </div>
                )}

                <select id="purpose"  name='purpose' value={services[0].purpose} className={styles.form_control} onChange={handleInputChange}> 
                    <option value="" disabled>-- Select Purpose of Service --</option>
                    <option>Other</option>
                    <option>First Service</option>
                    <option>Second Service</option>
                    <option>Third Service</option>
                    <option>Fourth Service</option>
                    <option>Final Service</option>
                    <option>One Time service</option>

                </select>

                {["Other", "First Service"].includes(services[0].purpose) && (
                    <>
                        <div className={styles.input_container}>
                        <label htmlFor="classification">Classification</label>
                        <input
                            className={styles.form_control}
                            id="classification"
                            name="classification"
                            type="text"
                            value={services[0].classification === "" ? "NA" : services[0].classification}
                            onChange={handleInputChange}
                        />
                        </div>
                        <div className={styles.input_container}>
                        <label htmlFor="next_service_date">Next Service Date</label>
                        <input
                            className={styles.form_control}
                            id="next_service_date"
                            name="next_service_date"
                            type="date"
                            value={services[0].next_service_date.split("T")[0] || ''}
                            onChange={handleInputChange}
                        />
                        </div>
                    </>
                )}

              <button  type='submit' className={styles.submitButton}>Submit</button>
              </div>
            </form>
     </div>
    </div>
    )

}

export default page