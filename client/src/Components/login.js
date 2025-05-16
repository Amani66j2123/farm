import {
  Col,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Features/UserSlice";
//import logo from "../Images/logo-t.png"; // Add your logo here

const Login = () => {
const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.users.user);
  const isSuccess = useSelector((state) => state.users.isSuccess);
  const isError = useSelector((state) => state.users.isError);

  const handleLogin = () => {
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  useEffect(() => {
  if (isError) {
    navigate("/login");
  }
  if (isSuccess && user) {
    if (user.isAdmin) {
      navigate("/mangeadmin"); // Redirect to admin page
    } else {
      navigate("/home");
    }
  }
}, [user, isError, isSuccess, navigate]);


  return (
    <div className="login-bg">
      <Container className="login-bg2 d-flex justify-content-center align-items-center min-vh-100">
        <Card className="login-card shadow p-4 animate__animated animate__fadeIn">
          <CardBody>
            <div className=" text-center mb-4">
              {/*<img src={logo} alt="Logo" className="login-logo" />*/}
              <CardTitle tag="h3" className="fw-bold mt-3">
                Welcome Back
              </CardTitle>
              <p className="text-muted">Login to your account</p>
            </div>
            <Form>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email ..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control-custom"
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control-custom"
                />
              </FormGroup>
              <Button onClick={handleLogin}color="primary" block className="mt-3">
                Login
              </Button>
              <p className="text-center mt-3">
                you don't have account? <Link to="/register">Sign up now</Link>
              </p>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
