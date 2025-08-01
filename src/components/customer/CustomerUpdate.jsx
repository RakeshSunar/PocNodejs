// components/CustomerManagement.js
"use client";
import { useState, useEffect } from "react";
import styles from "./customer.module.css";
import axios from "axios";
import { getCookieValue } from "../../../utils/getCookie";
import { useRouter } from "next/navigation";

const CustomerUpadateDetails = () => {
  const [searchForm, setSearchForm] = useState({
    customerName: "",
    customerContactNo: "",
  });
  const [customers, setCustomers] = useState([]);


 
  
  const [currentPage, setCurrentPage] = useState(1);
  const router=useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSearch = () => {
    console.log("Search criteria:", searchForm);
    // Add your search logic here
  };


  const fetchCustomers = async () => {
    // const cookieStore = await cookies();
    try {
      // debugger
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/customers`,
        {
          headers: {
            Authorization: `Bearer ${getCookieValue("token")}`,
          },
        }
      );
      setCustomers(response.data);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    }
  };





  const handleDelete =  (customerId) => {
    try {
       const token = getCookieValue("token");
       axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/customers/${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update state or fetch customers again after deletion
      fetchCustomers();
    } catch (error) {
      console.error("Failed to delete customer:", error);
    }
  };

  
  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className={styles.container}>
      {/* Search Form */}
      <div className={styles.searchSection}>
        <div className={styles.searchForm}>
          <div className={styles.formGroup}>
            <label htmlFor="customerName" className={styles.label}>
              Customer Name:
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={searchForm.customerName}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="customerContactNo" className={styles.label}>
              Customer Contact No :
            </label>
            <input
              type="text"
              id="customerContactNo"
              name="customerContactNo"
              value={searchForm.customerContactNo}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>

          <button onClick={handleSearch} className={styles.searchButton}>
            Search
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className={styles.tableSection}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeader}>
                <th className={styles.th}>Customer ID No.</th>
                <th className={styles.th}>Customer Name</th>
                <th className={styles.th}>Contact no</th>
                <th className={styles.th}>Date</th>
                <th className={styles.th}>Total Amount</th>
                <th className={styles.th}>Update Details</th>
                <th className={styles.th}>Delete Details</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className={styles.tableRow}>
                  <td className={styles.td}>{customer.id}</td>
                  <td className={styles.td}>{customer.name}</td>
                  <td className={styles.td}>{customer.contact_no}</td>
                  <td className={styles.td}>{customer.date_of_registration}</td>
                  <td className={styles.td}>{customer.total_amount}</td>
                  <td className={styles.td}>
                    <button
                      className={styles.transactionButton}
                      onClick={() => router.push(`/updatecustomer/${customer.id}`)}
                    >
                      Update
                    </button>
                  </td>
                  <td className={styles.td}>
                    <button
                      onClick={() => handleDelete(customer.id)}
                      className={styles.transactionButton}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <button
            className={`${styles.pageButton} ${
              currentPage === 1 ? styles.active : ""
            }`}
            onClick={() => setCurrentPage(1)}
          >
            1
          </button>
        </div>
      </div>
 


      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <span>© Nice Pest Control - Developed by Vimiratech.</span>
          <a href="#" className={styles.footerLink}>
            Datacenter
          </a>
        </div>
      </footer>
    </div>
  );
};

export default CustomerUpadateDetails;
