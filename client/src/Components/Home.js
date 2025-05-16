import React from 'react';
import { Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SharePosts from './SharePost';
import Posts from './Posts';
import { Link } from 'react-router-dom';
import { FaLeaf, FaCalendarAlt } from 'react-icons/fa';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // For Collapse functionality

const Home = () => {
    const user = useSelector((state) => state.users.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || Object.keys(user).length === 0) {
            navigate("/login");
        }
    }, [user, navigate]);

    return (
        <div className="">
            {/* Welcome Section with Hero Banner */}
            <Row className="justify-content-center mb-5 hero-section">
                <Col md={10} lg={8} className="text-center py-4">
                    <h1 className="welcome-title mb-3">
                        <FaLeaf className="me-2" />
                        Welcome To Green Farm, <span className="text-primary">{user?.name || "Guest"}</span>
                    </h1>
                    <p className="lead welcome-subtitle">
                        Connect with our farming community and share your experiences
                    </p>
                </Col>
            </Row>

            {/* Content Area */}
            <div className="content-area">
                {/* SharePosts Card */}
                <Row className="justify-content-center mb-4">
                    <Col md={8} lg={6}>
                        <div className="card post-card shadow-sm">
                            <div className="card-body">
                                <SharePosts />
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* Posts Card */}
                <Row className="justify-content-center mb-4">
                    <Col md={8} lg={6}>
                        <div className="card post-card shadow-sm">
                            <div className="card-body">
                                <Posts />
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* Rent Button Section */}
                <Row className="justify-content-center mt-4">
                    <Col md={8} className="text-center">
                        <div className="rent-section p-4 rounded">
                            <h4 className="mb-3">
                                <FaCalendarAlt className="me-2" />
                                Ready to book your farm experience?
                            </h4>
                            <Link 
                                to="/customer" 
                                className="btn btn-success btn-lg rent-button"
                            >
                                Book Your Farm Rental Now
                            </Link>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Home;