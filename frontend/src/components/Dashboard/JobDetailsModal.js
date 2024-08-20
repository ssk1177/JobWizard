import React, { useEffect, useState } from "react";

const JobDetailsModal = ({ jobId, onClose }) => {
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    if (jobId) {
      fetchJobDetails(jobId);
    }
  }, [jobId]);

  const fetchJobDetails = async (jobId) => {
    try {
      const response = await fetch(`/job-details/${jobId}`);
      const data = await response.json();
      setJobDetails(data);
    } catch (error) {
      alert("Failed to fetch job details.");
    }
  };

  if (!jobDetails) return null;

  return (
    <div className="modal show" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{jobDetails.job_title}</h5>
          </div>
          <div className="modal-body" style={{'text-align': 'left'}}>
            <p>
              <strong>Company Name:</strong> {jobDetails.company_name}
            </p>
            <p>
              <strong>Location:</strong>{" "}
              {jobDetails.location || "Not Available"}
            </p>
            <p>
              <strong>Salary:</strong> {jobDetails.salary || "Not Available"}
            </p>
            <p>
              <strong>Posted:</strong> {jobDetails.posted || "Not Available"}
            </p>
            <p>
              <strong>Platform:</strong>{" "}
              {jobDetails.platform || "Not Available"}
            </p>
            <p>
              <strong>Applied on:</strong>{" "}
              {jobDetails.applied_on || "Not Available"}
            </p>
            <p>
              <strong>Status:</strong> {jobDetails.status || "Not Available"}
            </p>
            <p>
              <strong>Job Description:</strong> <br />
              {jobDetails.job_desc || "Not Available"}
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;
