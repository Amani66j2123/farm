import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUser, FaPhone, FaEnvelope, FaCalendarAlt, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import * as ENV from "../config"; 

const Manage = () => {
  const [listOfFeedbacks, setListOfFeedbacks] = useState([]);
  const [countRecords, setCountRecords] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

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
        const response = await Axios.get(`${ENV.SERVER_URL}/manage`);
        setListOfFeedbacks(response.data.feedbacks);
        setCountRecords(response.data.count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const deleteFeedback = async (id) => {
    try {
      const confirmDelete = window.confirm("Do you really want to delete?");
      if (confirmDelete) {
        const response = await Axios.delete(`${ENV.SERVER_URL}/deletef/${id}`);
        setListOfFeedbacks(listOfFeedbacks.filter((val) => val._id !== id));
        setCountRecords(response.data.count);
        alert(response.data.msg);
      }
    } catch (err) {
      console.log("Error");
    }
  };

  const filteredFeedbacks = listOfFeedbacks.filter(feedback => {
    const name = feedback.fullName?.toLowerCase() || "";
    const email = feedback.email?.toLowerCase() || "";
    const phone = feedback.phoneNo?.toString() || "";
    const term = searchTerm.toLowerCase();
    return name.includes(term) || email.includes(term) || phone.includes(term);
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredFeedbacks.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredFeedbacks.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="manage-customers-container">
      <div className="header-section">
        <h1 className="page-title">
          <FaUser className="icon" /> Feedback Management
        </h1>
        <div className="controls">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search feedbacks..."
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

      <div className="table-responsive">
        <table className="table table-striped table-bordered shadow rounded">
          <thead className="table-dark text-center">
            <tr>
              <th><FaUser /> Full Name</th>
              <th><FaPhone /> Phone No</th>
              <th><FaEnvelope /> Email</th>
              <th><FaCalendarAlt /> Date</th>
              <th>Opinion (Farm)</th>
              <th>Opinion (Services)</th>
              <th>Rating (Clean)</th>
              <th>Rating (Electrical)</th>
              <th>Rent Again?</th>
              <th>More Details</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {currentRecords.length > 0 ? (
              currentRecords.map((feedback) => (
                <tr key={feedback._id} className="table-row">
                  <td>{feedback.fullName}</td>
                  <td>{feedback.phoneNo}</td>
                  <td>{feedback.email}</td>
                  <td>{feedback.date}</td>
                  <td>{feedback.opinionFarm}</td>
                  <td>{feedback.opinionServices}</td>
                  <td>{feedback.ratingClean}</td>
                  <td>{feedback.ratingElectrical}</td>
                  <td>{feedback.rentAgain}</td>
                  <td>{feedback.details}</td>
                  <td>
                    <Link to={`/updatef/${feedback._id}`} className="btn btn-sm btn-outline-info">
                      <FaEdit /> Edit
                    </Link>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => deleteFeedback(feedback._id)}>
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="text-center no-records">
                  {searchTerm ? "No matching feedback records found" : "No feedback records available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredFeedbacks.length > recordsPerPage && (
        <div className="pagination-container">
          <nav>
            <ul className="pagination justify-content-center">
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
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => paginate(index + 1)}>
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
    </div>
  );
};

export default Manage;
