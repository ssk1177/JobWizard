import React, { useState } from "react";
import JobStatsCard from "./JobStatsCard";
import ApplicationsTable from "./ApplicationsTable";
import JobDetailsModal from "./JobDetailsModal";
import Layout from '../Layout'
import "./Dashboard.css"

const JobDashboard = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [jobId, setJobId] = useState(null);

  const fetchJobs = async () => {
    try {
      const response = await fetch(`${API_URL}/fetch_jobs`, { method: "POST" });
      if (response.ok) {
        alert("Jobs added successfully to the database!");
      } else {
        alert("Failed to fetch Jobs.");
      }
    } catch (error) {
      alert("Failed to fetch Jobs.");
    }
  };

  const handleShowDetails = (jobId) => {
    setJobId(jobId);
  };

  const handleCloseModal = () => {
    setJobId(null);
  };

  return (
    <Layout>
      <div className="container-fluid mt-3">
        <div style={{ textAlign: "right" }} class="mb-3">
          <button className="btn btn-primary" onClick={fetchJobs}>
            Fetch Jobs
          </button>
        </div>
        <div className="row">
          <JobStatsCard
            count={100}
            title="Total Jobs Fetched"
            tooltip="We have processed over 1,200 resumes. Keep uploading to find your dream job!"
          />
          <JobStatsCard
            count={10}
            title="Total Applications"
            tooltip="We have processed over 1,200 resumes. Keep uploading to find your dream job!"
          />
          <JobStatsCard
            count={90}
            title="Pending Applications"
            tooltip="We have processed over 1,200 resumes. Keep uploading to find your dream job!"
          />
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Applications</h5>
                <ApplicationsTable onShowDetails={handleShowDetails} />
                <div style={{float: "right"}}>
                  <a href="/Archive" className="btn btn-secondary">
                    View Archive
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {jobId && <JobDetailsModal jobId={jobId} onClose={handleCloseModal} />}
      </div>
    </Layout>
  );
};

export default JobDashboard;
