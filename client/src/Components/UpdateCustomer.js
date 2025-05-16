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

  let { id } = useParams();
  useEffect(() => {
    Axios.get(`${ENV.SERVER_URL}/getCustomer/${id}`)
      .then((response) => {
        setFullName(response.data.result.fullName);
        setCivilNo(response.data.result.civilNo);
        setEmail(response.data.result.email);
        setPhoneNo(response.data.result.phoneNo);
        setDay(response.data.result.day);
        setDate(response.data.result.date);
        setTime(response.data.result.time);
        setCustomerType(response.data.result.customerType);
        setNumAdults(response.data.result.numAdults);
        setNumChildren(response.data.result.numChildren);
        setCelebrationType(response.data.result.celebrationType);
        setPayment(response.data.result.payment);
        setDetails(response.data.result.details);
        setTotalPrice(response.data.result.totalPrice);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // Function to compute the total price and result
  const computePrice = () => {
    let totalPrice = 35;

    // Calculate base price
    if (day === "4" || day === "5" || day === "6") {
      // Add 15% for Thursday, Friday, and Saturday
      totalPrice += totalPrice + totalPrice * 0.15;
    } else {
      totalPrice += totalPrice;
    }
    setTotalPrice(totalPrice);

    // Calculate net price with tax (5%)
    const netPrice = totalPrice + totalPrice * 0.05;

    setTotalPrice(netPrice);

    // Compute result based on total price
    if (netPrice > 0) {
      setResult("update Rentall");
    } else {
      setResult("not update Rentall");
    }
  };

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.put(`${ENV.SERVER_URL}/updateC/${id}`, {
        fullName: fullName,
        civilNo: civilNo,
        phoneNo: phoneNo,
        email: email,
        day: day,
        date: date,
        time: time,
        customerType: customerType,
        numAdults: numAdults,
        numChildren: numChildren,
        celebrationType: celebrationType,
        payment: payment,
        details: details,
        totalPrice: totalPrice,
        result: result,
      });

      setResponseMsg(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <div className="row">
        <div className="col-md-6">
          <h1 className="title">Update Rental Farm Form</h1>
          <div className="info">
            <form onSubmit={handleFormSubmit} className="container form-group mb-3">
              <table className="centerTable table">
                <tbody>
                  <tr>
                    <td>Full Name:</td>
                    <td>
                      <input
                        type="text"
                        id="fullName"
                        className="form-control"
                        onChange={(e) => setFullName(e.target.value)}
                        value={fullName}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Civil No:</td>
                    <td>
                      <input
                        type="text"
                        id="civilNo"
                        className="form-control"
                        onChange={(e) => setCivilNo(e.target.value)}
                        value={civilNo}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Phone No:</td>
                    <td>
                      <input
                        type="text"
                        id="phoneNo"
                        className="form-control"
                        onChange={(e) => setPhoneNo(e.target.value)}
                        value={phoneNo}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Day:</td>
                    <td>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(e) => setDay(e.target.value)}
                        value={day}
                      >
                        <option value="">Select a day</option>
                        <option value="1">Saturday</option>
                        <option value="2">Sunday</option>
                        <option value="3">Monday</option>

                        <option value="4">Tuesday</option>
                        <option value="5">Wednesday</option>
                        <option value="6">Thursday</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Date:</td>
                    <td>
                      <input
                        type="date"
                        id="date"
                        className="form-control"
                        onChange={(e) => setDate(e.target.value)}
                        value={date}
                      />
                      {day && <small className="text-primary">Day: {day}</small>}
                    </td>
                  </tr>
                  <tr>
                    <td>Time:</td>
                    <td>
                      <input
                        type="time"
                        id="time"
                        className="form-control"
                        onChange={(e) => setTime(e.target.value)}
                        value={time}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Customer Type:</td>
                    <td>
                      <label value={customerType}>
                        <input
                          type="radio"
                          name="customerType"
                          value="new"
                          onChange={(e) => setCustomerType(e.target.value)}
                        />{" "}
                        New Customer
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="customerType"
                          value="existing"
                          onChange={(e) => setCustomerType(e.target.value)}
                        />{" "}
                        Existing Customer
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>Number of Adults:</td>
                    <td>
                      <input
                        type="number"
                        id="numAdults"
                        className="form-control"
                        onChange={(e) => setNumAdults(parseInt(e.target.value))}
                        value={numAdults}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Number of Children:</td>
                    <td>
                      <input
                        type="number"
                        id="numChildren"
                        className="form-control"
                        onChange={(e) => setNumChildren(parseInt(e.target.value))}
                        value={numChildren}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Celebration Type:</td>
                    <td>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(e) => setCelebrationType(e.target.value)}
                        value={celebrationType}
                      >
                        <option value="">Select a type</option>
                        <option value="birthday">Birthday</option>
                        <option value="wedding">Wedding</option>
                        <option value="anniversary">Anniversary</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Payment:</td>
                    <td>
                      <label value={payment}>
                        <input
                          type="radio"
                          name="payment"
                          value="cash"
                          onChange={(e) => setPayment(e.target.value)}
                        />{" "}
                        Cash
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="payment"
                          value="credit"
                          onChange={(e) => setPayment(e.target.value)}
                        />{" "}
                        Credit
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td> More Details:</td>
                    <td>
                      <textarea
                        id="details"
                        className="form-control"
                        onChange={(e) => setDetails(e.target.value)}
                        value={details}
                      ></textarea>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button className="btn btn-success" onClick={computePrice}>
                Save Rental
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-6">
          <div className="summary">
            <h1 className="title">Customer Summary</h1>
            <div className="container form-group mb-3 title">
              <p>Full Name: {fullName}</p>
              <p>Civil No: {civilNo}</p>
              <p>Phone No: {phoneNo}</p>
              <p>Email: {email}</p>
              <p>Day: {day}</p>
              <p>Date: {date}</p>
              <p>Time: {time}</p>
              <p>Customer Type: {customerType}</p>
              <p>Number of Adults: {numAdults}</p>
              <p>Number of Children: {numChildren}</p>
              <p>Celebration Type: {celebrationType}</p>
              <p>Payment: {payment}</p>
              <p>Details: {details}</p>
              <p>Total Price(OMR): {totalPrice}</p>
              <p>Result: {result}</p>
              <h3>{responseMsg} </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCustomer;