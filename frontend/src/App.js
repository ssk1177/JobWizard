import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Archive from "./components/Dashboard/Archive";
import Analytics from "./components/Analytics/Analytics";
import Settings from "./components/Settings/Settings";
import Profile from "./components/Profile/Profile";
import ScanResume from "./components/ScanResume/ScanResume";
import ScanResumeResult from "./components/ScanResume/ScanResumeResult";
import "./App.css";

// Import jwt-decode using CommonJS
const jwtDecode = require("jwt-decode");

console.log("jwtDecode:", jwtDecode);

const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decoded.exp < currentTime; // Check if token is expired
  } catch (error) {
    console.error("Failed to decode token", error);
    return true; // Consider token expired if decoding fails
  }
};

const PrivateRoute = ({ element: Element }) => {
  const token = localStorage.getItem("jwt");

  const isAuthenticated = token && !isTokenExpired(token);

  return isAuthenticated ? Element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
          <Route path="/Home" element={<PrivateRoute element={<Home />} />} />
          <Route
            path="/Dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
          <Route
            path="/Archive"
            element={<PrivateRoute element={<Archive />} />}
          />
          <Route
            path="/Analytics"
            element={<PrivateRoute element={<Analytics />} />}
          />
          <Route
            path="/Settings"
            element={<PrivateRoute element={<Settings />} />}
          />
          <Route
            path="/Profile"
            element={<PrivateRoute element={<Profile />} />}
          />
          <Route
            path="/ScanResume"
            element={<PrivateRoute element={<ScanResume />} />}
          />
          <Route
            path="/ScanResumeResult"
            element={<PrivateRoute element={<ScanResumeResult />} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
