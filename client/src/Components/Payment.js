import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUser, FaPhone, FaEnvelope, FaCalendarAlt, FaMoneyBillWave, FaInfoCircle, FaSearch } from "react-icons/fa";
import * as ENV from "../config"; 

const Payment = () => {
  const [listOfCustomer, setlistOfCustomer] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [countRecords, setcountRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const user = useSelector((state) => state.users.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate("/home");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`${ENV.SERVER_URL}/manageC`);
        setlistOfCustomer(response.data.customers);
        setFilteredCustomers(response.data.customers);
        setcountRecords(response.data.count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = listOfCustomer.filter(customer =>
      customer.fullName?.toLowerCase().includes(lowerSearch) ||
      customer.email?.toLowerCase().includes(lowerSearch) ||
      customer.civilNo?.toString().includes(lowerSearch) ||
      customer.phoneNo?.toString().includes(lowerSearch)
    );
    setFilteredCustomers(filtered);
    setCurrentPage(1);
  }, [searchTerm, listOfCustomer]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredCustomers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  return (
    <div className="manage-customers-container">
      <div className="header-section">
        <h1 className="page-title">
          <FaUser className="icon" /> Customer Payment Overview
        </h1>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="badge bg-primary">
            Total Records: {countRecords}
          </span>
          <div className="search-bar">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name, email, phone, or civil no"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-header">
            <tr>
              <th><FaUser /> Name</th>
              <th>Civil No</th>
              <th><FaPhone /> Phone</th>
              <th><FaEnvelope /> Email</th>
              <th>Day</th>
              <th><FaCalendarAlt /> Date</th>
              <th><FaMoneyBillWave /> Payment</th>
              <th>Total (OMR)</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((customers) => (
              <tr key={customers._id} className="customer-row">
                <td>{customers.fullName}</td>
                <td>{customers.civilNo}</td>
                <td>{customers.phoneNo}</td>
                <td>{customers.email}</td>
                <td>{customers.day}</td>
                <td>{new Date(customers.date).toLocaleDateString()}</td>
                <td>{customers.payment}</td>
                <td className="price-cell">{customers.totalPrice?.toFixed(2)}</td>
                
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination-controls d-flex justify-content-center mt-4">
          <button className="btn btn-outline-primary me-2" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Previous</button>
          <span className="mx-2">Page {currentPage} of {totalPages}</span>
          <button className="btn btn-outline-primary ms-2" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
