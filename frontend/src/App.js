import React  from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home/Home";
import Login from './components/Login/Login';
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

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Archive" element={<Archive />} />
          <Route path="/Analytics" element={<Analytics />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/ScanResume" element={<ScanResume />} />
          <Route path="/ScanResumeResult" element={<ScanResumeResult />} />
          {/* <Route exact path="/Logout" element={<Logout />} /> */}

          <Route path="*" element={() => "404 Not Found"} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
