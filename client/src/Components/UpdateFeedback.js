import React, { useEffect, useState } from "react";
import Rating from "react-rating";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaStar, FaRegStar } from "react-icons/fa";

const UpdateFeedback = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [opinionFarm, setOpinionFarm] = useState("");
  const [opinionServices, setOpinionServices] = useState("");
  const [ratingClean, setRatingClean] = useState(0);
  const [ratingElectrical, setRatingElectrical] = useState(0);
  const [rentAgain, setRentAgain] = useState("");
  const [details, setDetails] = useState("");
  const [responseMsg, setResponseMsg] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user);

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate("/home");
    }
  }, [user, navigate]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getf/${id}`)
      .then((res) => {
        const f = res.data.result;
        setFullName(f.fullName);
        setPhoneNo(f.phoneNo);
        setEmail(f.email);
        setDate(f.date);
        setOpinionFarm(f.opinionFarm);
        setOpinionServices(f.opinionServices);
        setRatingClean(f.ratingClean);
        setRatingElectrical(f.ratingElectrical);
        setRentAgain(f.rentAgain);
        setDetails(f.details);
      })
      .catch((err) => {
        console.error("Error fetching feedback:", err);
        alert("Failed to load feedback.");
        navigate("/manage");
      });
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3001/updateF/${id}`, {
        fullName,
        phoneNo,
        email,
        date,
        opinionFarm,
        opinionServices,
        ratingClean,
        ratingElectrical,
        rentAgain,
        details,
      })
      .then((res) => {
        setResponseMsg(res.data);
        alert("✅ Feedback updated successfully!");
        navigate("/manage");
      })
      .catch((err) => {
        console.error("Update error:", err);
        alert("❌ Failed to update. Please try again.");
      });
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center text-primary fw-bold">🛠️ Update Feedback</h2>

      <div className="card p-4 shadow-lg mb-4">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone No</label>
              <input
                type="text"
                className="form-control"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Opinion on the Farm</label>
              <input
                type="text"
                className="form-control"
                value={opinionFarm}
                onChange={(e) => setOpinionFarm(e.target.value)}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Opinion on Services</label>
              <input
                type="text"
                className="form-control"
                value={opinionServices}
                onChange={(e) => setOpinionServices(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Cleanliness Rating</label>
              <div>
                <Rating
                  initialRating={ratingClean}
                  emptySymbol={<FaRegStar className="text-secondary fs-4" />}
                  fullSymbol={<FaStar className="text-warning fs-4" />}
                  onChange={(val) => setRatingClean(val)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Electrical Rating</label>
              <div>
                <Rating
                  initialRating={ratingElectrical}
                  emptySymbol={<FaRegStar className="text-secondary fs-4" />}
                  fullSymbol={<FaStar className="text-warning fs-4" />}
                  onChange={(val) => setRatingElectrical(val)}
                />
              </div>
            </div>
            <div className="col-12">
              <label className="form-label">Will you rent again?</label>
              <select
                className="form-select"
                value={rentAgain}
                onChange={(e) => setRentAgain(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="col-12">
              <label className="form-label">Additional Details</label>
              <textarea
                className="form-control"
                rows="3"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>
          </div>

          <div className="d-grid mt-4">
            <button type="submit" className="btn btn-primary btn-lg">
              Update Feedback
            </button>
          </div>
        </form>
      </div>

      <div className="card p-4 shadow-sm bg-light border mt-3">
        <h5 className="mb-3 text-success">📋 Preview</h5>
        <p><strong>Full Name:</strong> {fullName}</p>
        <p><strong>Phone No:</strong> {phoneNo}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Opinion (Farm):</strong> {opinionFarm}</p>
        <p><strong>Opinion (Services):</strong> {opinionServices}</p>
        <p><strong>Rating (Cleanliness):</strong> {ratingClean} / 5</p>
        <p><strong>Rating (Electrical):</strong> {ratingElectrical} / 5</p>
        <p><strong>Will Rent Again:</strong> {rentAgain}</p>
        <p><strong>Details:</strong> {details}</p>
      </div>
    </div>
  );
};

export default UpdateFeedback;
