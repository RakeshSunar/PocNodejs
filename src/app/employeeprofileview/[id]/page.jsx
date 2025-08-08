"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import styles from "../../../components/employee/addEmployee/addEmployee.module.css";
import axios from "axios";
import { getCookieValue } from "../../../../utils/getCookie";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const EmployeeProfileView = ({ params }) => {
  const { id: employeeId } = React.use(params);
  const [employee, setEmployee] = useState(null);
  const [advance, setAdvance] = useState([]);
  const [leaveRecords, setLeaveRecords] = useState([]);
  const [salaryRecords, setSalaryRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("employee");
  const [showAdvanceForm, setShowAdvanceForm] = useState(false);

  const [showSalaryForm, setShowSalaryForm] = useState(false);
  const [salaryForm, setSalaryForm] = useState({ Amount: "", Date: "" });
  const [posting, setPosting] = useState(false);
  const [postingLeave, setPostingLeave] = useState(false);
  const [postingSalary, setPostingSalary] = useState(false);

  //popup
  const [showSalaryPopup, setShowSalaryPopup] = useState(false);
  const [salaryPopupData, setSalaryPopupData] = useState(null);

  // Leave state
  const [showLeavePopup, setShowLeavePopup] = useState(false);
  const [leavePopupData, setLeavePopupData] = useState(false);
  const [leaveData, setLeaveData] = useState();
  console.log(leaveData, "leaveData from employee profile view");
  const [advanceForm, setAdvanceForm] = useState({
    Date: "",
    TransactionAmount: "",
    Purpose: "",
  });

  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    ApplyDate: "",
    StartDate: "",
    EndDate: "",
    start_date: "",
    end_date: "",
    Purpose: "",
  });

  const [showDateRange, setShowDateRange] = useState(false);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const resetDateRange = () => {
    setDateRange([
      {
        startDate: new Date(),
        endDate: null,
        key: "selection",
      },
    ]);
  };

  function dateFormat(isoString) {
    return moment(isoString).format("YYYY-MM-DD");
  }

  const handleCloseLeavePopup = () => {
    setShowLeavePopup(false);
    setLeavePopupData(null);
  };

  //salary functions
  const handleShowSalaryDetails = async (TransactionId) => {
    const token = getCookieValue("token");
    if (!token) return alert("Authentication token not found.");
    try {
      // Fetch all salary records for this employee
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/salary/${employeeId}`;
      const { data } = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Only check employeeId exists, then display the record for transactionId
      let salaryArray = Array.isArray(data) ? data : [data];
      const filtered = salaryArray.find(
        (rec) => String(rec.TransactionId || rec.id) === String(TransactionId)
      );

      if (!filtered) {
        alert("No matching salary record found for this transaction ID.");
        return;
      }

      setSalaryPopupData([filtered]); // Only display the first matching record
      setShowSalaryPopup(true);
    } catch (error) {
      alert("Failed to fetch salary details.");
    }
  };
  const handleCloseSalaryPopup = () => {
    setShowSalaryPopup(false);
    setSalaryPopupData(null);
  };

  // Generic input change handler

  const handleInputChange = (setState) => (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePurposeChange = (e) => {
    const { name, value } = e.target;

    setLeaveForm((prev) => ({
      ...prev,
      [name]: value,
      ApplyDate: "", // Reset when purpose changes
      start_date: "",
      end_date: "",
    }));

    // Show calendar only for "more than one"
    setShowDateRange(value === "more than one");
  };

  const closeLeavePopup = () => {
    setShowLeavePopup(false);
    resetLeaveForm();
    resetDateRange(); // Reset date range when closing popup
  };

  const resetLeaveForm = () => {
    setLeaveForm((prev) => ({
      ...prev,
      Purpose: "",
      ApplyDate: "",
    }));
    setShowDateRange(false);
  };

  const handleDateRangeChange = (ranges) => {
    // debugger
    const { startDate, endDate } = ranges.selection;

    setDateRange([ranges.selection]);

    setLeaveForm((prev) => ({
      ...prev,

      start_date: dateFormat(startDate),
      end_date: dateFormat(endDate),
    }));
  };

  // CRUD handlers
  const handleDelete = async (type, id) => {
    const token = getCookieValue("token");
    if (!token) return alert("Authentication token not found.");
    try {
      // For salary, use the correct endpoint and ID
      const endpoint =
        type === "salary"
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/salary/${id}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/${type}/${id}`;
      await axios.delete(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchRecords(type);
    } catch (error) {
      alert(`Failed to delete ${type} record.`);
    }
  };

  const handleFormSubmit = async (
    type,
    form,
    setForm,
    setShowForm,
    setPosting
  ) => {
    setPosting(true);
    try {
      debugger
      const token = getCookieValue("token");
      if (!token) return alert("Authentication token not found.");
      let payload;
      if (type === "advance")
        payload = {
          ...form,
          Date: form.Date, // already in "YYYY-MM-DD" format from the input
        };
      if (type === "leave") {
        if (form.Purpose === "more than one") {
          payload = {
            start_date: form.start_date || leaveForm.start_date,
            end_date: form.end_date || leaveForm.end_date,
            purpose: form.Purpose,
          };
        } else {
          payload = {
            apply_date: form.ApplyDate,
            purpose: form.Purpose,
          };
        }
      }

      if (type === "salary")
        payload = {
          TransactionAmount: form.Amount,
          Date: form.Date ? new Date(form.Date).toISOString().slice(0, 10) : "",
        };
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/${type}/${employeeId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      await fetchRecords(type);
      setForm(
        type === "advance"
          ? { Date: "", TransactionAmount: "", Purpose: "" }
          : type === "leave"
          ? { ApplyDate: "", EmployeeName: "", Purpose: "" }
          : { Amount: "", Date: "" }
      );
      setShowForm(false);
    } catch (error) {
      alert(`Failed to post ${type} record.`);
    } finally {
      setPosting(false);
    }
  };

  const fetchRecords = async (type) => {
    const token = getCookieValue("token");
    if (!token) return;

    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/${type}/${employeeId}`;
      const { data } = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (type === "advance") {
        setAdvance(Array.isArray(data) ? data : data ? [data] : []);
      }

      if (type === "leave") {
        const formatLeaveData = (lr) => ({
          leave_id: lr.leave_id || lr.id || "",
          ApplyDate: lr.apply_date ? dateFormat(lr.apply_date) : "",
          StartDate: lr.start_date ? dateFormat(lr.start_date) : "",
          leave_date: lr.apply_date ? dateFormat(lr.apply_date) : "",
          EndDate: lr.end_date ? dateFormat(lr.end_date) : "",
          Purpose: lr.purpose || "",
          Details: lr.details || "",
          CreatedDate: lr.created_date ? dateFormat(lr.created_date) : "",
          EmployeeName: employee?.employee_name || "",
        });

        if (Array.isArray(data)) {
          setLeaveRecords(data.map(formatLeaveData));
        } else if (data) {
          setLeaveRecords([formatLeaveData(data)]);
        } else {
          setLeaveRecords([]);
        }
      }

      if (type === "salary") {
        setSalaryRecords(
          Array.isArray(data)
            ? data.map((sr) => ({
                id: sr.id || sr.TransactionId,
                TransactionId: sr.TransactionId || sr.id,
                TransactionAmount: sr.TransactionAmount || sr.amount,
                PaymentDate: sr.PaymentDate || sr.date,
              }))
            : data
            ? [
                {
                  id: data.id || data.TransactionId,
                  TransactionId: data.TransactionId || data.id,
                  TransactionAmount: data.TransactionAmount || data.amount,
                  PaymentDate: data.PaymentDate || data.date,
                },
              ]
            : []
        );
      }
    } catch {
      if (type === "advance") setAdvance([]);
      if (type === "leave") setLeaveRecords([]);
      if (type === "salary") setSalaryRecords([]);
    }
  };

  const fetchLeaveById = async (leave_id) => {
    try {
      const token = getCookieValue("token"); // or however you're storing your auth
      const response = await axios.get(
        `http://localhost:4000/api/leave/leaveid/${leave_id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLeaveData(response.data);
      setLeavePopupData(true);
    } catch (error) {
      console.error("Error fetching leave by leave_id:", error);
      return null;
    }
  };

  // Initial fetch
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = getCookieValue("token");
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/employees/${employeeId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEmployee(data[0]);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [employeeId]);

  useEffect(() => {
    fetchRecords("advance");
  }, [employeeId]);
  useEffect(() => {
    fetchRecords("leave");
  }, [employeeId, employee]);
  useEffect(() => {
    fetchRecords("salary");
  }, [employeeId]);

  if (loading) return <div>Loading...</div>;
  if (!employee) return <div>No records found.</div>;

  const buttonstyles = {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "black",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowAdvanceForm(false);
    setShowLeaveForm(false);
    setShowSalaryForm(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {["employee", "advance", "leave", "salary"].map((tab) => (
          <button
            key={tab}
            className={`${styles.tabButton} ${
              activeTab === tab ? styles.activeTab : ""
            }`}
            onClick={() => handleTabChange(tab)}
          >
            {tab.charAt(0).toUpperCase() +
              tab
                .slice(1)
                .replace("employee", "Employee Record")
                .replace("advance", "Advance Details")
                .replace("leave", "Leave Details")
                .replace("salary", "Salary Details")}
          </button>
        ))}
      </div>
      {activeTab === "employee" && (
        <form className={styles.formGrid}>
          <div className={`${styles.row} ${styles.rowTwo}`}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Employee Name</label>
              <input
                type="text"
                value={employee.employee_name || ""}
                className={styles.input}
                readOnly
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Contact no</label>
              <input
                type="tel"
                value={employee.contact_no || ""}
                className={styles.input}
                readOnly
              />
            </div>
          </div>
          <div className={`${styles.row} ${styles.rowThree}`}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Date of joining</label>
              <input
                type="date"
                value={
                  employee.date_of_joining
                    ? new Date(employee.date_of_joining)
                        .toISOString()
                        .slice(0, 10)
                    : ""
                }
                
                className={styles.dateInput}
                readOnly
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Bond Period</label>
              <input
                type="number"
                value={employee.bond_period_number || ""}
                className={styles.input}
                readOnly
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>End of Bond Period</label>
              <input
                type="date"
                value={
                  employee.bond_period_date
                    ? new Date(employee.bond_period_date)
                        .toISOString()
                        .slice(0, 10)
                    : ""
                }
                className={styles.dateInput}
                readOnly
              />
            </div>
          </div>
          <div className={`${styles.row} ${styles.rowTwo}`}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                value={employee.email || ""}
                className={styles.input}
                readOnly
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Adharcard No</label>
              <input
                type="text"
                value={employee.adharcard_no || ""}
                className={styles.input}
                readOnly
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Salary</label>
              <input
                type="number"
                value={employee.salary || ""}
                className={styles.input}
                readOnly
              />
            </div>
          </div>
          <div className={styles.locationSection}>
            <div className={styles.addressField}>
              <label className={styles.label}>Residential Address</label>
              <textarea
                value={employee.residential_address || ""}
                className={styles.textArea}
                rows={3}
                readOnly
              />
            </div>
          </div>
        </form>
      )}

      {activeTab === "advance" && (
        <>
          <div className="table-responsive">
            <table className="table table-bordered text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Transaction ID</th>
                  <th>Date of Payment</th>
                  <th>Amount</th>
                  <th>PURPOSE</th>
                  <th>Delete Entry</th>
                </tr>
              </thead>
              <tbody>
                {advance.map((record, index) => (
                  <tr key={index}>
                    <td>{record.TransactionId}</td>
                    <td>{dateFormat(record.PaymentDate)}</td>
                    <td>{record.TransactionAmount}</td>
                    <td>{record.Purpose}</td>
                    <td
                      style={{
                        cursor: "pointer",
                        color: "red",
                        fontWeight: "bold",
                      }}
                      onClick={() =>
                        handleDelete("advance", record.TransactionId)
                      }
                    >
                      X
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!showAdvanceForm ? (
            <button
              type="button"
              className="buttonstyle"
              onClick={() => setShowAdvanceForm(true)}
            >
              Add New Record
            </button>
          ) : (
            <form
              className="text-center mt-3"
              onSubmit={(e) => {
                e.preventDefault();
                handleFormSubmit(
                  "advance",
                  advanceForm,
                  setAdvanceForm,
                  setShowAdvanceForm,
                  setPosting
                );
              }}
              style={{ maxWidth: "700px", margin: "0 auto" }}
            >
              <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                {/* <input type="number" name="id" placeholder="Employee ID" value={employeeId} readOnly className="form-control" style={{ background: "#f5f5f5", width: "120px" }} /> */}
                <input
                  type="date"
                  name="Date"
                  placeholder="Date"
                  value={advanceForm.Date}
                  onChange={handleInputChange(setAdvanceForm)}
                  required
                  className="form-control"
                  style={{ width: "160px" }}
                />
                <input
                  type="number"
                  name="TransactionAmount"
                  placeholder="Amount"
                  value={advanceForm.TransactionAmount}
                  onChange={handleInputChange(setAdvanceForm)}
                  required
                  className="form-control"
                  style={{ width: "120px" }}
                />
                <input
                  type="text"
                  name="Purpose"
                  placeholder="Purpose"
                  value={advanceForm.Purpose}
                  onChange={handleInputChange(setAdvanceForm)}
                  required
                  className="form-control"
                  style={{ width: "180px" }}
                />
              </div>
              <div className="d-flex justify-content-center gap-2">
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={posting}
                >
                  {posting ? "Posting..." : "Submit"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowAdvanceForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </>
      )}

      {activeTab === "leave" && (
        <div className={styles.tabContent}>
          <div className="table-responsive">
            <table className="table table-bordered text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>LEAVE ID</th>
                  <th>APPLY DATE</th>
                  <th>EMPLOYEE NAME</th>
                  <th>PURPOSE</th>
                  <th>SEE DETAILS</th>
                  <th>DELETE ENTRY</th>
                </tr>
              </thead>
              <tbody>
                {leaveRecords.map((record, index) => (
                  <tr key={index}>
                    <td>{record.leave_id || record.id}</td>
                    <td>{record.CreatedDate}</td>
                    <td>{record.EmployeeName || record.name}</td>
                    <td>{record.Purpose || record.purpose}</td>
                    <td>
                      <button
                        style={{
                          color: "blue",
                          background: "transparent",
                          cursor: "pointer",
                          fontWeight: "bold",
                          padding: "10px",
                          border: "none",
                        }}
                        onClick={() => fetchLeaveById(record.leave_id)}
                      >
                        Click here to see details
                      </button>
                    </td>
                    <td
                      style={{
                        cursor: "pointer",
                        color: "red",
                        fontWeight: "bold",
                      }}
                      onClick={() =>
                        handleDelete("leave", record.leave_id || record.id)
                      }
                    >
                      X
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Show leave form if not already showing */}

          {!showLeavePopup && (
            <button
              className="buttonstyle"
              onClick={() => setShowLeavePopup(true)}

            >
              Add New Record
            </button>
          )}

          {showLeavePopup && (
            <div
              className="salary-popup-overlay"
              onClick={() => setShowLeavePopup(false)}
            >
              <div
                className="salary-popup-container"
                onClick={(e) => e.stopPropagation()}
              >
                <form
                  className="text-center mt-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleFormSubmit(
                      "leave",
                      leaveForm,
                      setLeaveForm,
                      setShowLeavePopup,
                      setPostingLeave
                    );
                  }}
                  style={{ maxWidth: "700px", margin: "0 auto" }}
                >
                  <div className="leave-date-section">
                    {leaveForm.Purpose === "more than one" ? (
                      <DateRange
                        editableDateInputs={false}
                        onChange={handleDateRangeChange}
                        moveRangeOnFirstSelection={false}
                        ranges={dateRange}
                      />
                    ) : leaveForm.Purpose === "only one" ||
                      leaveForm.Purpose === "half day" ? (
                      <input
                        type="date"
                        name="ApplyDate"
                        value={leaveForm.ApplyDate}
                        onChange={(e) =>
                          setLeaveForm((prev) => ({
                            ...prev,
                            ApplyDate: e.target.value,
                          }))
                        }
                        required
                        className="form-control"
                        style={{ width: "160px" }}
                      />
                    ) : null}

                    <input
                      type="text"
                      name="EmployeeName"
                      placeholder="Employee Name"
                      value={employee ? employee.employee_name : ""}
                      readOnly
                      className="form-control"
                      style={{ width: "180px", background: "#f5f5f5" }}
                    />

                    <select
                      name="Purpose"
                      value={leaveForm.Purpose}
                      onChange={handlePurposeChange}
                      required
                      className="form-control"
                      style={{ width: "180px" }}
                    >
                      <option value="">Select Purpose</option>
                      <option value="more than one">more than one</option>
                      <option value="only one">only one</option>
                      <option value="half day">half day</option>
                    </select>
                  </div>

                  <div className="leave-button-section">
                    <button
                      type="submit"
                      className="leave-submit-btn "
                      disabled={postingLeave}
                      style={{ marginRight: "10px" }}
                    >
                      {postingLeave ? "Posting..." : "Submit"}
                    </button>
                    <button
                      type="button"
                      className="leave-cancel-btn"
                      onClick={closeLeavePopup}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "salary" && (
        <div className={styles.tabContent}>
          <div className="table-responsive">
            <table className="table table-bordered text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>TRANSACTION ID</th>
                  <th>AMOUNT</th>
                  <th>DATE OF PAYMENT</th>
                  <th>SEE DETAILS</th>
                  <th>DELETE ENTRY</th>
                </tr>
              </thead>
              <tbody>
                {salaryRecords.map((record, index) => (
                  <tr key={index}>
                    <td>{record.TransactionId}</td>
                    <td>{record.TransactionAmount}</td>
                    <td>
                      {record.PaymentDate ? dateFormat(record.PaymentDate) : ""}
                    </td>
                    <td>
                      <button
                        style={{
                          color: "blue",
                          background: "transparent",
                          cursor: "pointer",
                          fontWeight: "bold",
                          padding: "10px",
                          border: "none",
                        }}
                        onClick={() =>
                          handleShowSalaryDetails(record.TransactionId)
                        }
                      >
                        Click here to see details
                      </button>
                    </td>
                    {/* <td><button style={{ color: 'blue', background: 'transparent', cursor: 'pointer', fontWeight: 'bold', padding:"10px", border:"none"}}>Click here to see details</button></td> */}
                    <td
                      style={{
                        cursor: "pointer",
                        color: "red",
                        fontWeight: "bold",
                      }}
                      onClick={() =>
                        handleDelete("salary", record.TransactionId)
                      }
                    >
                      X
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!showSalaryForm ? (
            <div className="text-center mt-3">
              <button
                className="buttonstyle"
                onClick={() => setShowSalaryForm(true)}
              >
                Add New Record
              </button>
            </div>
          ) : (
            <form
              className="text-center mt-3"
              onSubmit={(e) => {
                e.preventDefault();
                handleFormSubmit(
                  "salary",
                  salaryForm,
                  setSalaryForm,
                  setShowSalaryForm,
                  setPostingSalary
                );
              }}
              style={{ maxWidth: "700px", margin: "0 auto" }}
            >
              <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                <input
                  type="number"
                  name="Amount"
                  placeholder="Amount"
                  value={salaryForm.Amount}
                  onChange={handleInputChange(setSalaryForm)}
                  required
                  className="form-control"
                  style={{ width: "120px" }}
                />
                <input
                  type="date"
                  name="Date"
                  placeholder="Date"
                  value={salaryForm.Date}
                  onChange={handleInputChange(setSalaryForm)}
                  required
                  className="form-control"
                  style={{ width: "160px" }}
                />
              </div>
              <div className="d-flex justify-content-center gap-2">
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={postingSalary}
                >
                  {postingSalary ? "Posting..." : "Submit"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowSalaryForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Salary Details Popup */}
      {showSalaryPopup && salaryPopupData && (
        <div className="salary-popup-overlay">
          <div
            className="salary-popup-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="salary-popup-close"
              onClick={handleCloseSalaryPopup}
            >
              &times;
            </button>

            <h5 className="salary-popup-title">Salary Slip</h5>
            <hr className="salary-popup-divider" />

            <div className="salary-popup-employee-details">
              <p className="salary-popup-text">
                Employee ID: {salaryPopupData[0]?.id || "0"}
              </p>
              <p className="salary-popup-text">
                Employee Name: {employee.employee_name || "0"}
              </p>
              <p className="salary-popup-text">
                Contact Number: {employee.contact_no || "0"}
              </p>
            </div>

            <p className="salary-popup-actual-salary">
              <strong>Actual Salary:</strong> {employee.salary || "0"}
            </p>

            <h6 className="salary-popup-section-title">
              Advance Amount & Leave Details
            </h6>
            <div className="salary-popup-advance-details">
              <p className="salary-popup-text">
                Advance Amount: {salaryPopupData[0]?.advanceAmount || "None"}
              </p>
              <p className="salary-popup-text">
                No of Leave: {salaryPopupData[0]?.leaveCount || "0"}
              </p>
            </div>

            <h6 className="salary-popup-section-title">Payment Details</h6>
            <div className="table-responsive salary-popup-table">
              <table className="table table-bordered text-center">
                <thead className="salary-popup-table-header">
                  <tr>
                    <th>TRANSACTION ID</th>
                    <th>DATE OF PAYMENT</th>
                    <th>MODE OF PAYMENT</th>
                    <th>TOTAL SALARY</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{salaryPopupData[0]?.id}</td>
                    <td>{dateFormat(salaryPopupData[0]?.PaymentDate)}</td>
                    <td>{salaryPopupData[0]?.modeOfPayment || "Cash"}</td>
                    <td>{salaryPopupData[0]?.TransactionAmount || "-"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="salary-popup-actions">
              <button
                className="btn salary-btn-close"
                onClick={handleCloseSalaryPopup}
              >
                Close
              </button>
              <button
                className="btn salary-btn-print"
                onClick={() => window.print()}
              >
                Print
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Leave Details Popup */}
      {leaveData && leavePopupData && (
        <div className="leave-popup-overlay">
          <div
            className="leave-popup-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="leave-popup-close"
              onClick={handleCloseLeavePopup}
            >
              &times;
            </button>

            <h5 className="leave-popup-title">Leave Details</h5>
            <hr className="leave-popup-divider" />

            <div className="leave-popup-row">
              <div className="leave-popup-col">
                <strong>Employee Name:</strong>{" "}
                {leaveData?.employee_name || "-"}
              </div>
              <div className="leave-popup-col">
                <strong>Contact No:</strong> {employee?.contact_no || "-"}
              </div>
              <div className="leave-popup-col">
                <strong>Apply Date:</strong>{" "}
                {leaveData?.created_date
                  ? dateFormat(leaveData.created_date)
                  : "-"}
              </div>
            </div>

            <div className="leave-popup-section">
              <strong>Purpose of Leave:</strong> {leaveData?.purpose || "-"}
            </div>

            <hr />

            <div className="leave-popup-row">
              <div className="leave-popup-col-half">
                <strong>From Date:</strong>{" "}
                {leaveData?.start_date || leaveData?.leave_date
                  ? dateFormat(leaveData.start_date || leaveData.leave_date)
                  : "-"}
              </div>
              <div className="leave-popup-col-half">
                <strong>To Date:</strong>{" "}
                {leaveData?.end_date || leaveData?.leave_date
                  ? dateFormat(leaveData.end_date || leaveData.leave_date)
                  : "-"}
              </div>
            </div>

            <div className="leave-popup-actions">
              <button
                className="leave-btn leave-btn-warning"
                onClick={handleCloseLeavePopup}
              >
                Close
              </button>
              <button
                className="leave-btn leave-btn-dark"
                onClick={() => window.print()}
              >
                Print Data of Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeProfileView;
