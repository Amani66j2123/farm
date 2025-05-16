import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaEnvelope,
  FaSearch,
  FaEdit,
  FaTrash
} from "react-icons/fa";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

const ManageCinfo = () => {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const user = useSelector((state) => state.users.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate("/home");
    }
  }, [user, navigate]);

  const toggleModal = () => setModal(!modal);

  const fetchUsers = async () => {
    try {
      const response = await Axios.get("http://localhost:3001/manageUsers");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsNewUser(false);
    toggleModal();
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Do you really want to delete this user?");
    if (confirmDelete) {
      try {
        await Axios.delete(`http://localhost:3001/deleteUser/${id}`);
        setUsers(users.filter(user => user._id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleSave = async () => {
    try {
      if (isNewUser) {
        const newUser = { ...currentUser, password: "NewUser123@" };
        const response = await Axios.post("http://localhost:3001/registerUser", newUser);
        setUsers([...users, response.data]);
      } else {
        await Axios.put(`http://localhost:3001/updateUser/${currentUser._id}`, currentUser);
        setUsers(users.map(user => (user._id === currentUser._id ? currentUser : user)));
      }
      setCurrentUser(null);
      toggleModal();
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const filteredUsers = users.filter((u) =>
    (u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredUsers.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="manage-customers-container">
      <div className="header-section">
        <h1 className="page-title">
          <FaUser className="icon" /> Manage Registered Users
        </h1>
        <div className="controls d-flex align-items-center gap-3">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by name or email..."
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
              Total Users: {filteredUsers.length}
            </span>
          </div>
          <Button color="success" onClick={() => {
            setCurrentUser({ name: '', email: '' });
            setIsNewUser(true);
            toggleModal();
          }}>
            Add New User
          </Button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover shadow rounded">
          <thead className="table-dark text-center">
            <tr>
              <th><FaUser /> Name</th>
              <th><FaEnvelope /> Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? currentUsers.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="actions-cell">
                  <Button color="info" size="sm" className="me-2" onClick={() => handleEdit(user)}>
                    <FaEdit /> Edit
                  </Button>
                  <Button color="danger" size="sm" onClick={() => handleDelete(user._id)}>
                    <FaTrash /> Delete
                  </Button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="3" className="text-center text-muted">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredUsers.length > recordsPerPage && (
        <div className="pagination-container">
          <nav>
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
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
                <button className="page-link" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{isNewUser ? "Add New User" : "Edit User"}</ModalHeader>
        <ModalBody>
          {currentUser && (
            <>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={currentUser.name}
                onChange={handleChange}
                className="form-control mb-3"
              />
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={currentUser.email}
                onChange={handleChange}
                className="form-control"
              />
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>Save</Button>
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ManageCinfo;
