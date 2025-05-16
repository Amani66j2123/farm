import React from 'react';
import { Container, Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { FaUsers, FaCalendarAlt, FaMoneyBillWave, FaComments } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import Location from './Location';
const Mangeadmin = () => {
    const user = useSelector((state) => state.users.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.isAdmin) {
            navigate("/home");
        }
    }, [user, navigate]);

    const adminCards = [
        {
            title: "Manage Customers",
            icon: <FaUsers size={40} className="mb-3" />,
            link: "/MangeCinfo",
            color: "primary"
        },
        {
            title: "View Reservations",
            icon: <FaCalendarAlt size={40} className="mb-3" />,
            link: "/ManageC",
            color: "success"
        },
        {
            title: "View Payments",
            icon: <FaMoneyBillWave size={40} className="mb-3" />,
            link: "/payment",
            color: "info"
        },
        {
            title: "View Feedback",
            icon: <FaComments size={40} className="mb-3" />,
            link: "/manage",
            color: "warning"
        }
    ];

    return (
        
            <Container className="py-5">
                
                <h1 className="text-center mb-5 admin-welcome">
                    Welcome <span className="text-primary">{user?.name}</span>
                </h1>
                <h2>Admin Location information</h2>
                <Location/>
                <Row className="justify-content-center">
                    {adminCards.map((card, index) => (
                        <Col key={index} md="6" lg="3" className="mb-4">
                            <Card 
                                className={`h-100 admin-card border-0 shadow-sm bg-${card.color} text-white`}
                                tag={Link}
                                to={card.link}
                            >
                                <CardBody className="d-flex flex-column align-items-center justify-content-center py-4">
                                    {card.icon}
                                    <CardTitle tag="h5" className="text-center">
                                        {card.title}
                                    </CardTitle>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
     
    );
};

export default Mangeadmin;