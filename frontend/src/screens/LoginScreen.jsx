import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import {setCredentials} from "../slices/authSlice.js"
import {toast }from "react-toastify"
import Loader from "../components/Loader";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login,{isLoading}] = useLoginMutation()
  const {userInfo} = useSelector((state) => state.auth)

  useEffect(() => {
      if (userInfo) {
        navigate("/");
      }
    }, [userInfo, navigate]);

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const res = await login({email,password}).unwrap()
      dispatch(setCredentials({...res}))
      navigate("/");
    } catch (error) {
      toast.error(error.data.message || error.error)
    }
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {isLoading && <Loader />}
        <Button variant="primary" className="mt-3" type="submit">
          Login
        </Button>
        {error && <p className="text-danger">{error}</p>}

        <Row className="py-3">
          <Col>
            New Customer ? <Link to="/register">Register</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
