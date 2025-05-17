import {
  Container,
  Row,
  Col,
  Button
} from "reactstrap";

import { userSchemaValidation } from "../Validations/UserValidations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  registerUser
} from "../Features/UserSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation),
  });

  const onSubmit = (data) => {
    try {
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      dispatch(registerUser(userData));
      navigate("/login");
    } catch (error) {
      console.log("Error.");
    }
  };

  return (
    <div className="register-bg">
      <Container fluid className="register-container d-flex align-items-center justify-content-center">
        <Row className="w-100">
          <Col lg="6" className="register-left d-none d-lg-flex align-items-center justify-content-center">
            <div className="text-light text-center px-5">
              <h1 className="display-4 fw-bold">Create Your Account</h1>
              <p className="lead">Join our farm app and explore amazing features.</p>
            </div>
          </Col>

          <Col lg="6" className="d-flex align-items-center justify-content-center">
            <form className="register-form p-5 shadow-lg rounded-4 bg-white animate__animated animate__fadeInRight" onSubmit={handleSubmit(onSubmit)}>
              <h3 className="text-center mb-4 fw-bold">Register</h3>

              <div className="form-group mb-3">
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  className="form-control form-control-custom"
                  {...register("name", { onChange: (e) => setname(e.target.value) })}
                />
                <p className="error-text">{errors.name?.message}</p>
              </div>

              <div className="form-group mb-3">
                <input
                  type="text"
                  id="email"
                  placeholder="Enter your email"
                  className="form-control form-control-custom"
                  {...register("email", { onChange: (e) => setemail(e.target.value) })}
                />
                <p className="error-text">{errors.email?.message}</p>
              </div>

              <div className="form-group mb-3">
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="form-control form-control-custom"
                  {...register("password", { onChange: (e) => setpassword(e.target.value) })}
                />
                <p className="error-text">{errors.password?.message}</p>
              </div>

              <div className="form-group mb-3">
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm password"
                  className="form-control form-control-custom"
                  {...register("confirmPassword", { onChange: (e) => setconfirmPassword(e.target.value) })}
                />
                <p className="error-text">{errors.confirmPassword?.message}</p>
              </div>

              <Button color="primary" block className="mt-3">
                Register
              </Button>
              <p className="text-center mt-3 smalltext">
                Have an account? <Link to="/login">Login now</Link>
              </p>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
