import { Link, Navigate } from "react-router-dom";
import { logout } from "../Features/UserSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "./a_logo.png";

import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // For Collapse functionality
import Collapse from 'react-bootstrap/Collapse';
import { useState } from "react";

const Header = () => {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const collapseNavbar = () => {
    const navbar = document.querySelector(".navbar-collapse");
    if (navbar?.classList.contains("show")) {
      new window.bootstrap.Collapse(navbar).hide();
    }
  };

  const userName = user.name || false;
  const isAdmin = user.isAdmin || false;
  const isLoggedIn = !!user;
  

  return (
    <div>
      {/* Navbar with logo and logout */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-success sticky-top shadow-sm">
        <div className="container-fluid">
          <Link to="Home" className="navbar-brand d-flex align-items-center" onClick={collapseNavbar}>
            <img src={logo} alt="Logo" style={{ height: "50px", marginRight: "10px" }} />
            <span className="fs-4 fw-bold text-white">Green Farm</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto flex-wrap">
              <li className="nav-item">
                <Link className="nav-link fs-5" to="Home" onClick={collapseNavbar}>
                  Home
                </Link>
              </li>
<li className="nav-item">
                    <Link className="nav-link fs-5" to="/about" onClick={collapseNavbar}>
                      About Farm
                    </Link>
                  </li>
                <>
                  <li className="nav-item">
                    <Link className="nav-link fs-5" to="/register" onClick={collapseNavbar}>
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fs-5" to="/login" onClick={collapseNavbar}>
                      Login
                    </Link>
                  </li>
                </>
              

              {isLoggedIn && userName &&(
                <>
                  <li className="nav-item">
                    <Link className="nav-link fs-5" to="/customer" onClick={collapseNavbar}>
                      Customer Reserve Form
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fs-5" to="/feedbacks" onClick={collapseNavbar}>
                      Feedback Form
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fs-5" to="/gallery" onClick={collapseNavbar}>
                      Gallery of Farm
                    </Link>
                  </li>
                  {!isAdmin && (
                    <li className="nav-item">
                      <Link className="nav-link fs-5" to="/profile" onClick={collapseNavbar}>
                        Customer Profile
                      </Link>
                    </li>
                  )}
                </>
              )}

              {isLoggedIn && isAdmin && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link fs-5" to="/manageC" onClick={collapseNavbar}>
                      Manage Customers Reserve
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fs-5" to="/manage" onClick={collapseNavbar}>
                      Manage Feedbacks
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fs-5" to="/mangeadmin" onClick={collapseNavbar}>
                      Admin Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fs-5" to="/mangeCinfo" onClick={collapseNavbar}>
                      Manage Customer Info
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fs-5" to="/payment" onClick={collapseNavbar}>
                      List of Payment
                    </Link>
                  </li>
                </>
              )}

              {isLoggedIn && (
                <li className="nav-item">
                  <button
                    onClick={() => {
                      collapseNavbar();
                      handleLogout();
                    }}
                    className="btn btn-link nav-link fs-5 text-danger"
                    style={{ textDecoration: "none" }}
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Welcome Section */}
      <div className="bg-light py-4 border-bottom text-center">
        <div className="fs-5 fw-semibold text-success">
          Welcome to Green Farm {userName}
        </div>
        
      </div>
    </div>

    
  );
};

export default Header;
