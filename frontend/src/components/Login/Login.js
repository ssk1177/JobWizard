import React, { useState } from 'react';
import logo from '../../assets/images/logo.png'
import './Login.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [registerShow, setRegisterShow] = useState(false);
    const [regStatusShow, setRegStatusShow] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [formData, setFormData] = useState({
      username: "",
      password: "",
      email: "",
    });

    const DEBUG = true

    const handleRegisterClose = () => setRegisterShow(false);
    const handleRegisterShow = () => setRegisterShow(true);
    const [error, setError] = useState("");

    const handleRegStatusClose = () => setRegStatusShow(false);
    const handleRegStatusShow = () => setRegStatusShow(true);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();
      if (DEBUG)
        console.log("inside handleLogin, user:", username);
      

      try {
        if (DEBUG) console.log("Inside handleLogin");

        const response = await axios.post(`${API_URL}/login`, {
          username: username,
          password: password,
        });
        console.log(response.data);
        if (response.status === 200) {
          // Successful login
          navigate("/home"); // Redirect to the home page
        } else {
          setError("Invalid credentials");
        }
      } catch (error) {
        if (DEBUG)
          //console.log("There was an error!", error.response.data.message);
            console.log("There was an error!", error);

        setModalData(error.response.data.message);
        handleRegStatusShow();
      }
    };

    
    const handleChange = (e) => {
      if (DEBUG) console.log("inside handle change, e:", e);
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleRegisterSubmit = async (e) => {
      e.preventDefault();

      try {
        if (DEBUG) console.log("Inside handleRegisterSubmit");

        const response = await axios.post(
          `${API_URL}/register`,
          formData
        );
        console.log(response.data);
        setModalData(response.data.message);
        handleRegisterClose();
        handleRegStatusShow();
      } catch (error) {
        if (DEBUG)
          console.log("There was an error!", error.response.data.message);
            console.log("There was an error!", error);
        handleRegisterClose();

        setModalData(error.response.data.message);
        handleRegStatusShow();
      }
    };

    return (
      <div className="background-section">
        <div
          className="container login-page"
          style={{ boxShadow: "10px 5px 5px currentColor" }}
        >
          <div className="image-section">
            <img src={logo} alt="Logo" className="logo" />
            <label className="moto">
              Automating Job Search with <br />
              Intelligent Resume Matching
            </label>
          </div>
          <div className="form-section">
            <label style={{ fontFamily: "serif", color: "#8080b8" }}>
              User Login
            </label>
            <form onSubmit={handleLogin}>
              <div className="input-icons">
                <i className="fas fa-user icon"></i>
                <input
                  type="text"
                  className="input-field"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
              </div>
              <div className="input-icons">
                <i className="fas fa-lock icon"></i>
                <input
                  type="password"
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <div className="remember-checkbox">
                <input
                  type="checkbox"
                  id="remember"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <label htmlFor="remember" style={{ fontSize: "10px" }}>
                  {" "}
                  Remember{" "}
                </label>
              </div>
              <div style={{ textAlign: "center" }}>
                <button
                  type="submit"
                  className="btn-primary button-center"
                >
                  Login
                </button>
              </div>
              <br />
              <div>
                <label style={{ fontSize: "10px", float: "left" }}>
                  Forgot Password?
                </label>
                <label
                  style={{
                    fontSize: "10px",
                    float: "right",
                    color: "#8080b8",
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                >
                  <a href="#" onClick={handleRegisterShow}>
                    Sign Up
                  </a>
                </label>
              </div>
            </form>
          </div>
        </div>

        {/* Registration Status Modal */}
        <Modal
          show={regStatusShow}
          onHide={handleRegStatusClose}
          data={modalData}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title> Status </Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalData}</Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              type="submit"
              onClick={handleRegStatusClose}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Register Modal */}
        <Modal show={registerShow} onHide={handleRegisterClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleRegisterSubmit}>
              <Form.Group controlId="formUsername" className="form-group">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-control"
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="form-group">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="form-group">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              type="submit"
              onClick={handleRegisterSubmit}
            >
              Register
            </Button>
          </Modal.Footer>
          <div className="text-center pb-3">
            <a href="/signin">Already have an account? Sign In here</a>
          </div>
        </Modal>
      </div>
    );
};

export default Login;
