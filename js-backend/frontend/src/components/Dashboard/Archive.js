import React, { useState } from "react";
import Layout from "../Layout";
import JobStatsCard from "./JobStatsCard";
import ApplicationsTable from "./ApplicationsTable";
import JobDetailsModal from "./JobDetailsModal";


function ArchivesTable({ onShowDetails }) {
  const [jobId, setJobId] = useState(null);

  const handleShowDetails = (jobId) => {
    setJobId(jobId);
  };

  const handleCloseModal = () => {
    setJobId(null);
  };

  return (
    <Layout>
      <div className="container mt-3">
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
                <h5 className="card-title">Archived Applications</h5>
                <ApplicationsTable onShowDetails={handleShowDetails} />
              </div>
            </div>
          </div>
        </div>
        {jobId && <JobDetailsModal jobId={jobId} onClose={handleCloseModal} />}
      </div>
    </Layout>
  );
}

export default ArchivesTable;
