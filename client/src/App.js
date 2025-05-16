import "./App.css";
import { BrowserRouter as Router, Routes, Route ,Navigate} from "react-router-dom";
import Banner from "./Components/Banner";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Gallery from "./Components/Galary";
import Feedbacks from "./Components/Feedbacks";
import Manage from "./Components/Manage";
import UpdateFeedback from "./Components/UpdateFeedback";
import Customer from "./Components/Customer";
import ManageC from "./Components/ManageC";
import UpdateCustomer from "./Components/UpdateCustomer";
import Profile from "./Components/Profile";
import Home from "./Components/Home";
import Login from "./Components/login";
import Register from "./Components/register";
import Mangeadmin from "./Components/Mangeadmin";
import Payment from "./Components/Payment";
import ManageCustomers from "./Components/Mangecustomer";
import MangeCinfo from "./Components/MangeCinfo";
import MyReservations from "./Components/MyReservations"; // Import MyReservations
import CheckEmail from "./Components/CheckEmail"; // Import CheckEmail
import About from "./Components/About";

const App = () => {
  return (
    <div className="back ">
      <div className="container-fluid">
        <Router>
          {/*1st row */}
          <div className="row">
            <div className="col-md-12 ">
              <Header />
            </div>
          </div>
          {/*2nd row */}
          <div className="row">
            <div className="col-md-12  ">
              <Banner />
            </div>
          </div>
          {/*3rd row */}
          <div className="row">
            <div className="col-md-12">
              <Routes>

                <Route path="Home" element={<Home />} />
                <Route path="/about" element={<About/>} />

                <Route path="/customer" element={<Customer />} />
                <Route path="/manageC" element={<ManageC />} />
                <Route path="/feedbacks" element={<Feedbacks />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/manage" element={<Manage />} />
                <Route path="/updateF/:id" element={<UpdateFeedback />} />
                <Route path="/updateC/:id" element={<UpdateCustomer />} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="profile" element={<Profile />} />
                <Route path="mangeadmin" element={<Mangeadmin />} />
                <Route path="payment" element={<Payment />} />
                <Route path="mangecustomer" element={<ManageCustomers />} />
                <Route path="mangeCinfo" element={<MangeCinfo />} />
                <Route path="/myReservations" element={<MyReservations />} />{" "}
                {/* Add the route for email verification success page */}
                <Route path="/MyReservations/:email" element={<MyReservations/>} />

              </Routes>
            </div>
          </div>
          {/*4th row */}
          <div className="row">
            <div className="col-md-12">
              <Footer />
            </div>
          </div>
        </Router>
      </div>
    </div>
  );
};

export default App;