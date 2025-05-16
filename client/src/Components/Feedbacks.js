import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import Axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as ENV from "../config"; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // For Collapse functionality
const Feedbacks = () => {
  const name = useSelector((state) => state.users.user.name);
  const navigate = useNavigate();

  useEffect(() => {
    if (!name) {
      navigate("/login");
    }
  }, [name, navigate]);
  

  const [fullName, setFullName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [isValidPhoneNo, setIsValidPhoneNo] = useState(false);
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [opinionFarm, setOpinionFarm] = useState("");
  const [opinionServices, setOpinionServices] = useState("");
  const [ratingClean, setRatingClean] = useState(0);
  const [ratingElectrical, setRatingElectrical] = useState(0);
  const [rentAgain, setRentAgain] = useState("");
  const [details, setDetails] = useState("");
  const [responseMsg, setResponseMsg] = useState("");

  const handlePhoneNoChange = (e) => {
    const val = e.target.value;
    const valid = /^[79][0-9]{7}$/.test(val);
    setPhoneNo(val);
    setIsValidPhoneNo(valid);
  };

  const handleDateChange = (e) => {
    const selected = new Date(e.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

 

    const dayMap = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    setDay(dayMap[selected.getDay()]);
    setDate(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (
      !fullName ||
      !phoneNo ||
      !isValidPhoneNo ||
      !email ||
      !date ||
      !opinionFarm ||
      !opinionServices ||
      ratingClean === 0 ||
      ratingElectrical === 0 ||
      !rentAgain
    ) {
      alert("Please complete all fields and use a valid phone number.");
      return;
    }

    try {
      const response = await Axios.post(`${ENV.SERVER_URL}/addf`, {
        fullName,
        phoneNo,
        email,
        date,
        opinionFarm,
        opinionServices,
        ratingClean: ratingClean.toString(),
        ratingElectrical: ratingElectrical.toString(),
        rentAgain,
        details,
      });

      setResponseMsg(response.data || "Feedback submitted!");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setResponseMsg("❌ Error submitting feedback. make sure date is correct  date");
    }
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="mb-4 text-center text-primary fw-bold">🪴Feedback</h2>
        <p className="text-muted">Help us improve your experience 🪴</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="glass-card p-4 mb-4 rounded-4 shadow-lg">
            <form onSubmit={handleFormSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Phone No</label>
                  <input type="text" maxLength="8" className="form-control" onChange={handlePhoneNoChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Date</label>
                  <input type="date" className="form-control" onChange={handleDateChange} />
                  {day && <small className="text-primary">Day: {day}</small>}
                </div>
                <div className="col-12">
                  <label className="form-label">Opinion on the Farm</label>
                  <input type="text" className="form-control" onChange={(e) => setOpinionFarm(e.target.value)} />
                </div>
                <div className="col-12">
                  <label className="form-label">Opinion on Services</label>
                  <input type="text" className="form-control" onChange={(e) => setOpinionServices(e.target.value)} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Cleanliness Rating</label>
                  <Rating
                    name="clean-rating"
  value={ratingClean}
  onChange={(e, newValue) => setRatingClean(newValue)}
  precision={1}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Electrical Rating</label>
                  <Rating
                    name="clean-rating"
  value={ratingElectrical}
  onChange={(e, newValue) => setRatingElectrical(newValue)}
  precision={1}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Would you rent again?</label>
                  <select className="form-select" onChange={(e) => setRentAgain(e.target.value)}>
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className="col-12">
                  <label className="form-label">Additional Comments</label>
                  <textarea className="form-control" rows={3} onChange={(e) => setDetails(e.target.value)} />
                </div>
              </div>

              <div className="d-grid mt-4">
                <button type="submit" className="btn btn-gradient btn-lg shadow-sm">
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>

          {responseMsg && (
            <div className={`alert mt-3 ${responseMsg.includes("Error") ? "alert-danger" : "alert-success"}`}>
              {responseMsg}
            </div>
          )}

          <div className="card mt-4 border-light shadow-sm p-3">
            <h5 className="mb-3 text-success">📋 Your Feedback Preview</h5>
            <p><strong>Full Name:</strong> {fullName}</p>
            <p><strong>Phone No:</strong> {phoneNo}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Date:</strong> {date ? new Date(date).toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' }) : ''} ({day})</p>
            <p><strong>Farm Opinion:</strong> {opinionFarm}</p>
            <p><strong>Service Opinion:</strong> {opinionServices}</p>
            <p><strong>Cleanliness Rating:</strong> {ratingClean} / 5</p>
            <p><strong>Electrical Rating:</strong> {ratingElectrical} / 5</p>
            <p><strong>Rent Again:</strong> {rentAgain}</p>
            <p><strong>Details:</strong> {details}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedbacks;
