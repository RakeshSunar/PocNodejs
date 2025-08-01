'use client'
import styles from '@/components/customer/CustomerDetails.module.css'
import { getCookieValue } from "../../../../utils/getCookie";
import { use, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


function page (propsPromise){
    const params  = use(propsPromise.params);
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
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/customers/${params.cseid}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log("customerData",res.data)

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

        console.log("employees---",res.data)

        setEmployees(res.data); // adjust based on response // adjust based on response
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };
    const fetchServiceData = async () => {
      try {
        const token = getCookieValue("token");
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/services/getServices/19`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log("services--- id",res.data)

        setServices(res.data); // adjust based on response // adjust based on response
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };
  
    fetchData();
    fetchEmployeeData();
    fetchServiceData()
  }, []);

      const [TransactionData,setTransactionData] =useState({
        operator_id: "",
        other_operator_name: "",
        purpose:"",
        classification: "",
        date_of_service:"",
        next_service_date: "",
    })

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
            customer_id:customerData.id,
            operator_id:TransactionData.operator_id === "other"? -1: Number(TransactionData.operator_id),
            other_operator_name: TransactionData.other_operator_name? TransactionData.other_operator_name : 'NA',
            purpose: TransactionData.purpose,
            classification: TransactionData.classification,
            // date_of_service: TransactionData.date_of_service,
            date_of_service: TransactionData.date_of_service || formattedToday,
            next_service_date: TransactionData.next_service_date || formattedToday,
            };
            
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/services/${services[0].id}`,formattedData,
                {headers:{Authorization:`Bearer ${token}`,
            }})

            if (res.status === 200 || res.status === 201) {
                alert("✅ Customer data submitted successfully!");
                router.back(); // ✅ Go to previous page
            }

             console.log("TransactionData ==>",TransactionData)
            setTransactionData(
                { operator_id: "",
                  other_operator_name: "",  
                  purpose: "",  
                  classification: "",  
                  date_of_service: "",  
                  next_service_date: "",
                })

        }catch (error){

            console.error("❌ Submission failed:", error.res?.data || error);
        }


    }

    console.log("services data checklist",services)
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

                <select id="operator_id"  name='operator_id' value={services.operator_name} className={styles.form_control} onChange={handleInputChange}> 
                    <option value="" disabled>-- Select Operator Name --</option>

                    {employees.map((item) => (<option key={item.id} value={item.id}>{item.employee_name}</option>))}
                    {/* <option>Rakesh</option>
                    <option>Tejas</option>
                    <option>Kiran</option> */}
                </select>

                
                {services.operator_id === "-1" && (
                    <div className={styles.input_container}>
                        <label htmlFor="OperatorName">Other Operator name</label>
                        <input
                        className={styles.form_control}
                        id="other_operator_name"
                        name="other_operator_name"
                        type="text"
                        value={services.other_operator_name}
                        onChange={handleInputChange}
                        />
                    </div>
                )}

                <select id="purpose"  name='purpose' value={services.purpose} className={styles.form_control} onChange={handleInputChange}> 
                    <option value="" disabled>-- Select Purpose of Service --</option>
                    <option>Other</option>
                    <option>First Service</option>
                    <option>Second Service</option>
                    <option>Third Service</option>
                    <option>Fourth Service</option>
                    <option>Final Service</option>
                    <option>One Time service</option>

                </select>

                {["Other", "First Service"].includes(services.purpose) && (
                    <>
                        <div className={styles.input_container}>
                        <label htmlFor="classification">Classification</label>
                        <input
                            className={styles.form_control}
                            id="classification"
                            name="classification"
                            type="text"
                            value={services.classification}
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
                            value={services.next_service_date}
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