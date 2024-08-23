import React, { useEffect, useState } from "react";
import indeed_img from "../../assets/images/indeed_logo.png";
import linkedin_img from "../../assets/images/linkedin_logo.png";
import './Dashboard.css'

const ApplicationsTable = ({ onShowDetails }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("jwt");
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchJobListings();
  }, []);

  const fetchJobListings = async () => {
    try {
      const response = await fetch(`${API_URL}/get_listings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      alert("Failed to fetch listings.");
    }
  };

  const truncateString = (str, maxLength) => {
    return str.length > maxLength
      ? str.substring(0, maxLength - 3) + "..."
      : str;
  };

  return (
    <table className="table table-striped" style={{ fontSize: "small" }}>
      <thead>
        <tr className="text-center">
          <th>
            <input type="checkbox" />
          </th>
          <th>Title</th>
          <th>Company</th>
          <th>Location</th>
          <th>Platform</th>
          <th>Date</th>
          <th>Match Score</th>
          <th>Status</th>
          <th>Apply Link</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {applications.map((application) => (
          <tr className="text-center" key={application.job_id}>
            <td>
              <input type="checkbox" />
            </td>
            <td>{truncateString(application.job_title, 25)}</td>
            <td>{truncateString(application.company_name, 25)}</td>
            <td>{application.location}</td>
            <td>
              <img
                src={
                  application.platform === "indeed" ? indeed_img : linkedin_img
                }
                style={
                  application.platform === "indeed"
                    ? { height: "30px", border: "outset" }
                    : { width: "30px", height: "30px", border: "outset" }
                }
                alt={application.platform}
              />
              <span
                style={
                  application.platform === "indeed"
                    ? { display: "none" }
                    : { 'font-family': "emoji", 'font-weight': "600" }
                }
              >
                LinkedIn
              </span>
            </td>
            <td>{application.applied_on}</td>
            <td style={{ textAlign: "-webkit-center" }}>
              <span
                className="circle"
                style={{
                  backgroundColor:
                    application.match_score > 60 ? "green" : "red",
                }}
              >
                {application.match_score}
              </span>
            </td>
            <td>
              <span
                className="text-button"
                style={{
                  backgroundColor:
                    application.status === "applied" ? "green" : "red",
                }}
              >
                {application.status}
              </span>
            </td>
            <td>{application.apply_link}</td>
            <td>
              <a href="#" onClick={() => onShowDetails(application.job_id)}>
                Details
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ApplicationsTable;
