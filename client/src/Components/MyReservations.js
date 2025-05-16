// MyReservations.jsx
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import * as ENV from "../config"; 

const MyReservations = () => {
  const { email } = useParams(); // 📥 Get email from route
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!email || !email.includes("@")) {
      alert("Invalid email provided.");
      navigate("/profile"); // or redirect to home/login
      return;
    }

    const fetchReservations = async () => {
      try {
        const res = await Axios.get(`${ENV.SERVER_URL}/bookings/${email}`);
        setReservations(res.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching reservations:", err);
        setError("Failed to load reservations.");
        setLoading(false);
      }
    };

    fetchReservations();
  }, [email, navigate]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Reservations for: <span className="text-primary">{email}</span></h2>

      {loading && <p>Loading your reservations...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && reservations.length === 0 && (
        <p>No reservations found for this email.</p>
      )}

      {reservations.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Full Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Customer Type</th>
                <th>Celebration</th>
                <th>Adults</th>
                <th>Children</th>
                <th>Payment</th>
                <th>Total Price (OMR)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r) => (
                <tr key={r._id}>
                  <td>{r.fullName}</td>
                  <td>{new Date(r.date).toLocaleDateString()}</td>
                  <td>{r.time}</td>
                  <td>{r.customerType}</td>
                  <td>{r.celebrationType}</td>
                  <td>{r.numAdults}</td>
                  <td>{r.numChildren}</td>
                  <td>{r.payment}</td>
                  <td>{r.totalPrice?.toFixed(2)}</td>
                  <td>{r.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyReservations;
