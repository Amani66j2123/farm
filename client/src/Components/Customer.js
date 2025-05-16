import React, { useState, useEffect } from "react";
import Axios from "axios";
import * as ENV from "../config"; 

const Customer = () => {
  const [fullName, setFullName] = useState("");
  const [civilNo, setCivilNo] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [isValidPhoneNo, setIsValidPhoneNo] = useState(false);
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
  const [isSlotAvailable, setIsSlotAvailable] = useState(true);
  const [showSubmit, setShowSubmit] = useState(false);

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

  const computePrice = () => {
    if (!date || !time) {
      alert("Please select a valid date and time first & fill all required fields.");
      return;
    }

    let basePrice = 35.0;
    let finalPrice = basePrice;

    // Weekend pricing (Thu–Sat)
    if (["Thursday", "Friday", "Saturday"].includes(day)) {
      finalPrice += basePrice * 0.15;
    }

    finalPrice += finalPrice * 0.05; // Tax
    setTotalPrice(finalPrice);
    setResult(finalPrice > 0 ? "CALCULATED" : "Not CALCULATED");
    setShowSubmit(true);
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate <= today) {
      alert("Cannot select today or past dates.");
      return;
    }

    const dayName = dayMap[selectedDate.getDay()];
    setDay(dayName);
    setDate(e.target.value);
    setIsSlotAvailable(true);
  };

  const handleTimeChange = async (e) => {
    const selectedTime = e.target.value;
    setTime(selectedTime);
    setShowSubmit(false);

    if (!date) {
      alert("Select a date first.");
      return;
    }

    try {
      const res = await Axios.post(`${ENV.SERVER_URL}/checkAvailability`, {
        date,
        time: selectedTime,
      });
      setIsSlotAvailable(res.data.isAvailable);
      if (!res.data.isAvailable) {
        alert("Slot already booked.");
      }
    } catch (error) {
      console.error("Time check failed:", error);
      setIsSlotAvailable(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!isSlotAvailable) {
      alert("This slot is unavailable.");
      return;
    }

    if (
      !fullName ||
      !civilNo ||
      !phoneNo ||
      !isValidPhoneNo ||
      !email.includes("@") ||
      !day ||
      !date ||
      !time ||
      !customerType ||
      numAdults <= 0 ||
      !celebrationType ||
      !payment
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const res = await Axios.post(`${ENV.SERVER_URL}/addc`, {
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

      setResponseMsg("🎉 Booking successful!");
    } catch (error) {
      console.error("Save failed:", error);
      setResponseMsg("❌ Error while saving. Try again.");
    }
  };

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formatted = tomorrow.toISOString().split("T")[0];
    setDate(formatted);
    const dayName = dayMap[tomorrow.getDay()];
    setDay(dayName);
  }, []);

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6">
          <h2 className="text-primary fw-bold mb-4">🏡 Rental Form</h2>
          <form onSubmit={handleFormSubmit} className="p-4 border rounded shadow-sm bg-light">
            <div className="mb-3">
              <label>Full Name</label>
              <input type="text" className="form-control" onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label>Civil No</label>
              <input type="text" className="form-control" onChange={(e) => setCivilNo(e.target.value)} />
            </div>
            <div className="mb-3">
              <label>Phone No</label>
              <input type="text" className="form-control" onChange={handlePhoneNoChange} />
              {!isValidPhoneNo && phoneNo.length > 0 && (
                <small className="text-danger">Phone must be 8 digits, start with 7 or 9</small>
              )}
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label>Date</label>
              <input type="date" className="form-control" value={date} onChange={handleDateChange} />
              {day && <small className="text-primary">Day: {day}</small>}
            </div>
            <div className="mb-3">
              <label>Time</label>
              <input type="time" className="form-control" value={time} onChange={handleTimeChange} />
              {!isSlotAvailable && <small className="text-danger">This time is already booked</small>}
            </div>
            <div className="mb-3">
              <label>Customer Type</label>
              <div className="form-check">
                <input type="radio" name="customerType" value="new" className="form-check-input"
                  onChange={(e) => setCustomerType(e.target.value)} />
                <label className="form-check-label">New</label>
              </div>
              <div className="form-check">
                <input type="radio" name="customerType" value="existing" className="form-check-input"
                  onChange={(e) => setCustomerType(e.target.value)} />
                <label className="form-check-label">Existing</label>
              </div>
            </div>
            <div className="mb-3">
              <label>Number of Adults</label>
              <input type="number" className="form-control" onChange={(e) => setNumAdults(parseInt(e.target.value))} />
            </div>
            <div className="mb-3">
              <label>Number of Children</label>
              <input type="number" className="form-control" onChange={(e) => setNumChildren(parseInt(e.target.value))} />
            </div>
            <div className="mb-3">
              <label>Celebration Type</label>
              <select className="form-select" onChange={(e) => setCelebrationType(e.target.value)}>
                <option value="">Select</option>
                <option value="birthday">Birthday</option>
                <option value="wedding">Wedding</option>
                <option value="FamilyGather">Family Gather</option>

                <option value="anniversary">Anniversary</option>
                <option value="other">Other</option>

              </select>
            </div>
            <div className="mb-3">
              <label>Payment</label>
              <div className="form-check">
                <input type="radio" name="payment" value="cash" className="form-check-input"
                  onChange={(e) => setPayment(e.target.value)} />
                <label className="form-check-label">Cash</label>
              </div>
              <div className="form-check">
                <input type="radio" name="payment" value="credit" className="form-check-input"
                  onChange={(e) => setPayment(e.target.value)} />
                <label className="form-check-label">Credit</label>
              </div>
            </div>
            <div className="mb-3">
              <label>Extra Details</label>
              <textarea className="form-control" onChange={(e) => setDetails(e.target.value)} />
            </div>
            <div className="d-flex gap-2 mt-4">
              <button type="button" className="btn btn-outline-primary" onClick={computePrice}>
                💰 Calculate Total
              </button>
              {showSubmit && (
                <button type="submit" className="btn btn-success">
                  ✅ Submit Reservation
                </button>
              )}
            </div>
          </form>
          {responseMsg && <div className="alert mt-3 alert-info">{responseMsg}</div>}
        </div>

        <div className="col-md-6">
          <h2 className="text-secondary fw-bold mb-4">📋 Summary</h2>
          <div className="p-3 border rounded shadow-sm bg-white">
            <p><strong>Full Name:</strong> {fullName}</p>
            <p><strong>Civil No:</strong> {civilNo}</p>
            <p><strong>Phone:</strong> {phoneNo}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Date:</strong> {date}</p>
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

export default Customer;
