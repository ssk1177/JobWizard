import React  from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home/Home";
import Login from './components/Login/Login';
//import * as jwtDecode from "jwt-decode";
import jwtDecode from "jwt-decode";
//import Logout from "./components/Logout/Logout";
import Dashboard from "./components/Dashboard/Dashboard";
import Archive from "./components/Dashboard/Archive";
import Analytics from "./components/Analytics/Analytics";
import Settings from "./components/Settings/Settings"
import Profile from "./components/Profile/Profile"
import ScanResume from "./components/ScanResume/ScanResume"
import ScanResumeResult from "./components/ScanResume/ScanResumeResult";
//import "./pdfWorker";
import './App.css';

const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    // Assuming the token contains an 'exp' field in UNIX timestamp format
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decoded.exp < currentTime; // Check if token is expired
  } catch (error) {
    console.error("Failed to decode token", error);
    return true; // Consider token expired if decoding fails
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("jwt");


  const isAuthenticated = token && !isTokenExpired(token);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />
      }
    />
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <PrivateRoute path="/" component={Login} />
        <PrivateRoute path="/Home" component={Home} />
        <PrivateRoute path="/Dashboard" component={Dashboard} />
        <PrivateRoute path="/Archive" component={Archive} />
        <PrivateRoute path="/Analytics" component={Analytics} />
        <PrivateRoute path="/Settings" component={Settings} />
        <PrivateRoute path="/Profile" component={Profile} />
        <PrivateRoute path="/ScanResume" component={ScanResume} />
        <PrivateRoute path="/ScanResumeResult" component={ScanResumeResult} />
      </div>
    </Router>
  );
}

export default App;
