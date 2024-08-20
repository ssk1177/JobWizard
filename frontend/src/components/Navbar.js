import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/images/logo.png'
import { Dropdown } from "react-bootstrap";
import ScanResumeModal from './ScanResume/ScanResume'
import "./Navbar.css"; // Custom styles if needed
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Navbar = () => {
  const [showScanResumeModal, setShowScanResumeModal] = useState(false);

  const handleScanOpenModal = () => setShowScanResumeModal(true);
  const handleScanCloseModal = () => setShowScanResumeModal(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call the logout endpoint on the backend
      const response = await axios.post("/logout");

      if (response.status === 200) {
        // Redirect to the login page
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ paddingTop: "30px" }}>
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <Link className="navbar-brand" to="/">
            <img src={logo} height="60" width="60" alt="Logo" />
          </Link>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/Home" style={{ color: "white" }}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/dashboard"
                style={{ color: "white" }}
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/Analytics"
                style={{ color: "white" }}
              >
                Analytics
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/About" style={{ color: "white" }}>
                About
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginRight: "100px" }}
            onClick={handleScanOpenModal}
          >
            Scan Resume
          </button>
          <ScanResumeModal
            show={showScanResumeModal}
            handleClose={handleScanCloseModal}
          />
        </div>
        <div className="d-flex align-items-center">
          <Dropdown>
            <Dropdown.Toggle
              as="a"
              className="dropdown-toggle d-flex align-items-center hidden-arrow"
              id="navbarDropdownMenuAvatar"
            >
              <img
                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                className="rounded-circle"
                height="25"
                alt="Avatar"
              />
            </Dropdown.Toggle>

            <Dropdown.Menu align="end">
              <Dropdown.Item as={Link} to="/Profile">
                My profile
              </Dropdown.Item>
              {/* <Dropdown.Item as={Link} to="/Settings">
                Settings
              </Dropdown.Item> */}
              <Dropdown.Divider />
              <Dropdown.Item as={Link} onClick={handleLogout}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
