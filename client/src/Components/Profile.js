import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { updateUserProfile } from "../Features/UserSlice";
import { Form, FormGroup, Input, Label, Button, Row, Col } from "reactstrap";
import Location from "./Location";
import * as ENV from "../config"; 
const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.users.user);
    const currentEmail = user?.email;
    const name = user?.name;
    const profilePic = user?.profilePic;

    const customers = useSelector((state) => state.customers);
    const customer = customers ? customers.find(c => c.email === currentEmail) : null;

    const [userName, setUserName] = useState(name || '');
    const [pwd, setPwd] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newProfilePic, setNewProfilePic] = useState(null);
    const [imageURL, setImageURL] = useState(profilePic ? `${ENV.SERVER_URL}/uploads/${profilePic}` : 'https://via.placeholder.com/150');
    const [email, setEmail] = useState(currentEmail || '');

    useEffect(() => {
        if (!currentEmail) {
            navigate("/login");
        }
    }, [currentEmail, navigate]);

    useEffect(() => {
        if (profilePic) {
            setImageURL(`${ENV.SERVER_URL}/uploads/${profilePic}`);
        }
    }, [profilePic]);

    const handleClick = () => {
        const enteredEmail = prompt("Enter the email you used for your reservation:");
        if (!enteredEmail || !enteredEmail.includes("@")) {
            alert("Please enter a valid email address.");
            return;
        }
        navigate(`/MyReservations/${enteredEmail}`);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();

        if (pwd !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        const formData = new FormData();
        formData.append("name", userName);
        formData.append("newEmail", email);
        formData.append("password", pwd);
        if (newProfilePic) {
            formData.append("profilePic", newProfilePic);
        }

        try {
            await dispatch(updateUserProfile({ email: currentEmail, formData }));
            alert("Profile Updated.");
            navigate("/profile");
        } catch (error) {
            console.error("Failed to update profile:", error);
            alert("Failed to update profile. Please try again.");
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setNewProfilePic(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageURL(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
const handleDeleteAccount = async () => {
  const confirmDelete = window.confirm("Are you sure you want to delete your account?");
  if (!confirmDelete) return;

  try {
    const result = await dispatch(deleteUserAccount(currentEmail));
    
    if (deleteUserAccount.fulfilled.match(result)) {
      alert("Account deleted successfully.");
      navigate("/login");
    } else {
      alert("Failed to delete account. Reason: " + (result.payload || "Unknown error"));
    }
  } catch (error) {
    console.error("Failed to delete account:", error);
    alert("Failed to delete account. Please try again.");
  }
};
    return (
        <div className="container my-5">
            <div className="text-center mb-5">
                <h1 className="fw-bold text-success">Customer Profile</h1>
                <p className="text-muted">Manage your information and reservations</p>
            </div>

            <div className="card shadow p-4 mb-4">
                <Row className="align-items-center">
                    <Col md="4" className="text-center mb-4 mb-md-0">
                        <img
                            src={imageURL}
                            alt="Profile"
                            className="img-thumbnail rounded-circle"
                            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                        />
                        <FormGroup className="mt-3">
                            <Input
                                type="file"
                                name="profilePic"
                                id="profilePic"
                                onChange={handleFileChange}
                                className="form-control"
                            />
                        </FormGroup>
                    </Col>
                    <Col md="8">
                        <Form onSubmit={handleUpdate}>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="name">Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                            required
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="password">New Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={pwd}
                                            onChange={(e) => setPwd(e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="confirmPassword">Confirm Password</Label>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button color="success" type="submit" className="mt-3 w-100">
                                Update Profile
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </div>

            <div className="card shadow p-4">
                <h4 className="mb-4 text-success">Your Info</h4>
                <p><strong>Name:</strong> {name || 'N/A'}</p>
                <p><strong>Email:</strong> {currentEmail || 'N/A'}</p>
                <Location />

                <div className="d-flex flex-wrap gap-3 mt-4">
                    <Button color="danger" size="lg" onClick={handleDeleteAccount}>
                        <i className="bi bi-trash me-2"></i>
                        Delete Account
                    </Button>
                    <Button color="primary" size="lg" onClick={handleClick}>
                        <i className="bi bi-calendar-check me-2"></i>
                        Manage Reservations
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
