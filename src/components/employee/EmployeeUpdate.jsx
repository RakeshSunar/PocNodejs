// components/CustomerManagement.js
'use client';
import { useState } from 'react';
import styles from '../customer/customer.module.css';
import Header from '../header/Header';

const EmployeeUpadateDetails = () => {
  const [searchForm, setSearchForm] = useState({
    customerName: '',
    customerContactNo: ''
  });

  const [customers] = useState([
    {
      id: 3,
      name: 'rishi',
      contactNo: '9619438148',
      date: '06/06/0170',
      totalAmount: 10000,
      Installment: 'Add Transaction'
    },
    {
      id: 2,
      name: 'Vishwajit Rajkumar Rajbhar',
      contactNo: '9619438148',
      date: '2022-05-25',
      totalAmount: 10000,
      Installment: 'Add Transaction'
    },
    {
      id: 1,
      name: 'Vishwajit Rajkumar Rajbhar',
      contactNo: '8779546242',
      date: '2022-05-27',
      totalAmount: 10000,
      Installment: 'add Transaction'
    }
  ]);

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

  const handleAddTransaction = (customerId) => {
    console.log('Add transaction for customer:', customerId);
    // Add your transaction logic here
  };

  return (
    <div className={styles.container}>
        <Header/>
      {/* Search Form */}
      <div className={styles.searchSection}>
        <div className={styles.searchForm}>
          <div className={styles.formGroup}>
            <label htmlFor="customerName" className={styles.label}>
              Employee Name:
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
              Employee Contact No :
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
                <th className={styles.th}>Employee ID No.</th>
                <th className={styles.th}>Employee Name</th>
                <th className={styles.th}>Contact no</th>
                <th className={styles.th}>Date</th>
                <th className={styles.th}>Total Amount</th>
                <th className={styles.th}>Installment</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className={styles.tableRow}>
                  <td className={styles.td}>{customer.id}</td>
                  <td className={styles.td}>{customer.name}</td>
                  <td className={styles.td}>{customer.contactNo}</td>
                  <td className={styles.td}>{customer.date}</td>
                  <td className={styles.td}>{customer.totalAmount}</td>
                  <td className={styles.td}>
                    <button
                      onClick={() => handleAddTransaction(customer.id)}
                      className={styles.transactionButton}
                    >
                       + Add Transaction
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
  );
};

export default EmployeeUpadateDetails;