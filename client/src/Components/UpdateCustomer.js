import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import * as ENV from "../config";

const UpdateCustomer = () => {
  const [fullName, setFullName] = useState("");
  const [civilNo, setCivilNo] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [numAdults, setNumAdults] = useState(0);
  const [numChildren, setNumChildren] = useState(0);
  const [celebrationType, setCelebrationType] = useState("");
  const [payment, setPayment] = useState("");
  const [details, setDetails] = useState("");
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [result, setResult] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [showSubmit, setShowSubmit] = useState(false);
  const [isValidPhoneNo, setIsValidPhoneNo] = useState(false);

  let { id } = useParams();

  useEffect(() => {
    Axios.get(`${ENV.SERVER_URL}/getCustomer/${id}`)
      .then((response) => {
        const data = response.data.result;
        setFullName(data.fullName);
        setCivilNo(data.civilNo);
        setEmail(data.email);
        setPhoneNo(data.phoneNo);
        setDay(data.day);
        setDate(data.date);
        setTime(data.time);
        setCustomerType(data.customerType);
        setNumAdults(data.numAdults);
        setNumChildren(data.numChildren);
        setCelebrationType(data.celebrationType);
        setPayment(data.payment);
        setDetails(data.details);
        setTotalPrice(data.totalPrice);
        setResult(data.result);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const computePrice = () => {
    let basePrice = 35.0;
    let finalPrice = basePrice;
    if (["Thursday", "Friday", "Saturday"].includes(day)) {
      finalPrice += basePrice * 0.15;
    }
    finalPrice += finalPrice * 0.05;
    setTotalPrice(finalPrice);
    setResult(finalPrice > 0 ? "Updated book" : "Not Updated book");
  };
  const dayMap = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  const handlePhoneNoChange = (e) => {
    const val = e.target.value;
    setPhoneNo(val);
    setIsValidPhoneNo(/^[79][0-9]{7}$/.test(val));
  };

 
  

const handleDateChange = async (e) => {
  const selectedDate = new Date(e.target.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate <= today) {
    alert("Cannot select today or past dates.");
    return;
  }

  const dayName = dayMap[selectedDate.getDay()];
  const formattedDate = e.target.value;
  setDay(dayName);
  setDate(formattedDate);
  setShowSubmit(false);

  try {
    const res = await Axios.post(`${ENV.SERVER_URL}/checkDateAvailability`, {
      date: formattedDate,
    });
    setIsSlotAvailable(res.data.isAvailable);
    if (!res.data.isAvailable) {
      alert("The selected date is fully booked.");
    }
  } catch (error) {
    console.error("Date check failed:", error);
    setIsSlotAvailable(false);
  }
};


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.put(`${ENV.SERVER_URL}/updateC/${id}`, {
        fullName,
        civilNo,
        phoneNo,
        email,
        day,
        date,
        time,
        customerType,
        numAdults,
        numChildren,
        celebrationType,
        payment,
        details,
        totalPrice,
        result,
      });
      setResponseMsg(res.data.message || "🎉 Update successful!");
    } catch (error) {
      console.error(error);
      setResponseMsg("❌ Error while updating. Please try again.");
    }
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6">
          <h2 className="text-primary fw-bold mb-4">✏️ Update Rental Form</h2>
          <form onSubmit={handleFormSubmit} className="p-4 border rounded shadow-sm bg-light">
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={fullName}
                onChange={handlePhoneNoChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Civil No</label>
              <input
                type="text"
                className="form-control"
                value={civilNo}
                onChange={(e) => setCivilNo(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone No</label>
              <input
                type="text"
                className="form-control"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Date</label>
               <input type="date" className="form-control" value={date} onChange={handleDateChange} />
              {day && <small className="text-primary">Day: {day}</small>}
              
            </div>
            <div className="mb-3">
              <label className="form-label">Time</label>
              <input
                type="time"
                className="form-control"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Customer Type</label>
              <div className="form-check">
                <input
                  type="radio"
                  name="customerType"
                  className="form-check-input"
                  value="new"
                  checked={customerType === "new"}
                  onChange={(e) => setCustomerType(e.target.value)}
                />
                <label className="form-check-label">New</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  name="customerType"
                  className="form-check-input"
                  value="existing"
                  checked={customerType === "existing"}
                  onChange={(e) => setCustomerType(e.target.value)}
                />
                <label className="form-check-label">Existing</label>
              </div>
            </div>
            <div className="mb-3 d-flex gap-2">
              <div className="w-50">
                <label className="form-label">Adults</label>
                <input
                  type="number"
                  className="form-control"
                  value={numAdults}
                  onChange={(e) => setNumAdults(parseInt(e.target.value))}
                />
              </div>
              <div className="w-50">
                <label className="form-label">Children</label>
                <input
                  type="number"
                  className="form-control"
                  value={numChildren}
                  onChange={(e) => setNumChildren(parseInt(e.target.value))}
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Celebration Type</label>
              <select
                className="form-select"
                value={celebrationType}
                onChange={(e) => setCelebrationType(e.target.value)}
              >
                <option value="">Select</option>
                <option value="birthday">Birthday</option>
                <option value="wedding">Wedding</option>
                <option value="anniversary">Anniversary</option>
                <option value="familyGather">Family Gather</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Payment Method</label>
              <div className="form-check">
                <input
                  type="radio"
                  name="payment"
                  className="form-check-input"
                  value="cash"
                  checked={payment === "cash"}
                  onChange={(e) => setPayment(e.target.value)}
                />
                <label className="form-check-label">Cash</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  name="payment"
                  className="form-check-input"
                  value="credit"
                  checked={payment === "credit"}
                  onChange={(e) => setPayment(e.target.value)}
                />
                <label className="form-check-label">Credit</label>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Extra Details</label>
              <textarea
                className="form-control"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>
            <div className="d-flex gap-2 mt-4">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={computePrice}
              >
                💰 Calculate Total
              </button>
              <button type="submit" className="btn btn-success">
                ✅ Update Reservation
              </button>
            </div>
          </form>
          {responseMsg && (
            <div className="alert alert-info mt-3">{responseMsg}</div>
          )}
        </div>

        <div className="col-md-6">
          <h2 className="text-secondary fw-bold mb-4">📋 Summary</h2>
          <div className="p-3 border rounded shadow-sm bg-white">
            <p><strong>Full Name:</strong> {fullName}</p>
            <p><strong>Civil No:</strong> {civilNo}</p>
            <p><strong>Phone:</strong> {phoneNo}</p>
            <p><strong>Email:</strong> {email}</p>
<p><strong>Date:</strong> {date ? new Date(date).toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' }) : ''} </p>
            <p><strong>Time:</strong> {time}</p>
            <p><strong>Day:</strong> {day}</p>
            <p><strong>Customer Type:</strong> {customerType}</p>
            <p><strong>Adults:</strong> {numAdults}</p>
            <p><strong>Children:</strong> {numChildren}</p>
            <p><strong>Celebration:</strong> {celebrationType}</p>
            <p><strong>Payment:</strong> {payment}</p>
            <p><strong>Details:</strong> {details}</p>
            <p><strong>Total Price OMR:</strong> {totalPrice.toFixed(2)}</p>
            <p><strong>Result:</strong> {result}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCustomer;
