import React, { useState, useEffect } from "react";

const Settings = ({ settingsData, onUpdate }) => {
  const [localData, setLocalData] = useState({
    auto_apply: false,
    job_fetching_schedule: "",
    webscrape_sites: "indeed",
    match_score_cutoff: "",
  });

  useEffect(() => {
    if (settingsData) {
      const formattedData = {
        ...settingsData,
        job_fetching_schedule: settingsData.job_fetching_schedule
          ? settingsData.job_fetching_schedule.split("T")[0]
          : "",
      };
      setLocalData(formattedData);
    }
  }, [settingsData]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setLocalData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };
      onUpdate(updatedData); // Notify parent about the change
      return updatedData;
    });
  };

  return (
    <form className="profile-form">
      <div
        className="form-group"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <input
          type="checkbox"
          name="auto_apply"
          checked={localData.auto_apply}
          onChange={handleChange}
        />
        <label htmlFor="auto_apply">Auto Apply</label>
      </div>
      <div className="form-group">
        <label htmlFor="job_fetching_schedule">Jobs Fetching Schedule</label>
        <input
          type="date"
          name="job_fetching_schedule"
          value={localData.job_fetching_schedule || ""}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="webscrape_sites">Webscrape Sites</label>
        <select
          name="webscrape_sites"
          value={localData.webscrape_sites || "indeed"}
          onChange={handleChange}
        >
          <option value="indeed">Indeed</option>
          <option value="linkedin">LinkedIn</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="match_score_cutoff">Match Score Cutoff</label>
        <input
          type="number"
          name="match_score_cutoff"
          value={localData.match_score_cutoff || ""}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default Settings;
