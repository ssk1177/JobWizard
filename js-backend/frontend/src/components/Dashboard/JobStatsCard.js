import React from "react";

const JobStatsCard = ({ count, title, tooltip }) => {
  return (
    <div className="col-md-4">
      <div className="card mb-3 card-border-radius">
        <div className="card-body text-center">
          <h3 className="card-text">{count}</h3>
          <h5 className="card-title color-dark-gray">{title}</h5>
          <i className="fas fa-info-circle info-icon" title={tooltip}></i>
        </div>
      </div>
    </div>
  );
};

export default JobStatsCard;
