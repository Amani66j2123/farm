import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaUser, FaCalendarAlt, FaPhone, FaEnvelope, FaMoneyBillWave, FaUsers, FaChild, FaGlassCheers, FaCreditCard, FaInfoCircle, FaSearch } from "react-icons/fa";

const ManageC = () => {
  const [listOfCustomer, setlistOfCustomer] = useState([]);
  const [countRecords, setcountRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await Axios.get("http://localhost:3001/manageC");
        setlistOfCustomer(response.data.customers);
        setcountRecords(response.data.count);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  const user = useSelector((state) => state.users.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate("/home");
    }
  }, [user, navigate]);

  const deleteCustomer = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this customer?");
      if (confirmDelete) {
        setIsLoading(true);
        const response = await Axios.delete(`http://localhost:3001/deleteC/${id}`);
        setlistOfCustomer(listOfCustomer.filter((val) => val._id !== id));
        setcountRecords(response.data.count);
        alert(response.data.msg);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete customer");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await Axios.get("http://localhost:3001/manageC");
        setlistOfCustomer(response.data.customers);
        setcountRecords(response.data.count);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fixed search functionality with proper type checking
  const filteredCustomers = listOfCustomer.filter(customer => {
    const phoneNoStr = customer.phoneNo ? customer.phoneNo.toString() : '';
    const fullNameStr = customer.fullName ? customer.fullName.toLowerCase() : '';
    const emailStr = customer.email ? customer.email.toLowerCase() : '';
    const searchTermLower = searchTerm.toLowerCase();

    return (
      fullNameStr.includes(searchTermLower) ||
      emailStr.includes(searchTermLower) ||
      phoneNoStr.includes(searchTermLower)
    );
  });

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredCustomers.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredCustomers.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="manage-customers-container">
      <div className="header-section">
        <h1 className="page-title">
          <FaUser className="icon" /> Customer Reservation Management
        </h1>
        <div className="controls">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="search-input"
            />
          </div>
          <div className="stats-badge">
            <span className="badge bg-primary">
              Total Records: {countRecords}
            </span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="table-responsive">
  <table className="table table-striped table-bordered table-hover shadow rounded">
    <thead className="table-dark text-center">
                <tr>
                  <th><FaUser /> Name</th>
                  <th>Civil No</th>
                  <th><FaPhone /> Phone</th>
                  <th><FaEnvelope /> Email</th>
                  <th><FaCalendarAlt /> Date</th>
                  <th>day</th>
                  <th>Time</th>
                  <th><FaUsers /> Adults</th>
                  <th><FaChild /> Children</th>
                  <th><FaGlassCheers /> Type</th>
                  <th><FaMoneyBillWave /> Payment</th>
                  <th><FaInfoCircle /> Details</th>
                  <th>Total (OMR)</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.length > 0 ? (
                  currentRecords.map((customer) => (
                    <tr key={customer._id} className="customer-row">
                      <td>{customer.fullName}</td>
                      <td>{customer.civilNo}</td>
                      <td>{customer.phoneNo?.toString()}</td>
                      <td>{customer.email}</td>
                      <td>{new Date(customer.date).toLocaleDateString()}</td>
                      <td>{customer.day}</td>
                      <td>{customer.time}</td>
                      <td>{customer.numAdults}</td>
                      <td>{customer.numChildren}</td>
                      <td>{customer.celebrationType}</td>
                      <td>{customer.payment}</td>
                      <td className="details-cell">
                        {customer.details }
                      </td>
                      <td className="price-cell">{customer.totalPrice?.toFixed(2)}</td>
                      <td>
                        <span className={`status-badge ${customer.result?.toLowerCase()}`}>
                          {customer.result}
                        </span>
                      </td>
                     <td className="actions-cell">
  <Link 
    to={`/updateC/${customer._id}`} 
    className="btn btn-sm btn-outline-info me-1"
  >
    <FaEdit /> Edit
  </Link>
  <button
    className="btn btn-sm btn-outline-danger"
    onClick={() => deleteCustomer(customer._id)}
  >
    <FaTrash /> Delete
  </button>
</td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="14" className="text-center no-records">
                      {searchTerm ? "No matching records found" : "No customer records available"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {filteredCustomers.length > recordsPerPage && (
            <div className="pagination-container">
              <nav>
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <li 
                      key={index} 
                      className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                      <button 
                        className="page-link" 
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ManageC;