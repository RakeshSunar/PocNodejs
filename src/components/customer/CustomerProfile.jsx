// components/CustomerManagement.js
'use client';
import { useEffect, useState } from 'react';
import styles from './customer.module.css';
import Header from '../header/Header';
import { getCookieValue } from '../../../utils/getCookie';
import axios from 'axios';
import Link from 'next/link';

const CustomerProfile = () => {

    const [customerData, setCustomerData] = useState([]);

  useEffect(()=>{
    const fetchDataCustomerData = async () => {
      try {
        const token = getCookieValue("token");
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/customers`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCustomerData(res.data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };
    fetchDataCustomerData();

  },[])

  console.log("first render customerData -->", customerData);
  const [searchForm, setSearchForm] = useState({
    customerName: '',
    customerContactNo: ''
  });


  const [currentPage, setCurrentPage] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = () => {
    console.log('Search criteria:', searchForm);
    // Add your search logic here
  };

  return (
    <>
    <div className={styles.container}>
    <Header />
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
                <th className={styles.th}>View Profile</th>
              </tr>
            </thead>
            <tbody>
              {customerData.map((customer) => (
                <tr key={customer.id} className={styles.tableRow}>
                  <td className={styles.td}>{customer.id}</td>
                  <td className={styles.td}>{customer.name}</td>
                  <td className={styles.td}>{customer.contact_no}</td>
                  <td className={styles.td}>{customer.date_of_registration.split('T')[0]}</td>
                  <td className={styles.td}>{customer.total_amount}</td>
                  <td className={styles.td}>
                    <Link href={`/customerprofileview/${customer.id}`} className={styles.searchButton}>
                       View 
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <button
            className={`${styles.pageButton} ${currentPage === 1 ? styles.active : ''}`}
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
          <a href="#" className={styles.footerLink}>Datacenter</a>
        </div>
      </footer>
    </div>
    </>
  );
};

export default CustomerProfile;