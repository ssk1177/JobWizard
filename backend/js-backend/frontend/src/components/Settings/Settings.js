import React, { useState, useEffect } from "react";
import Layout from '../Layout'

const Settings = () => {
  const [settings, setSettings] = useState({
    autoApply: false,
    jobFetchingSchedule: "",
    webscrapeSites: [],
    matchScoreCutoff: "",
  });

  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  useEffect(() => {
    // Fetch initial settings from the server and set them
    // Example: fetch('/api/settings').then(response => response.json()).then(data => setSettings(data));
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === "checkbox" ? checked : value,
    }));
    setIsSubmitEnabled(true);
  };

  const handleMultiSelectChange = (event) => {
    const { options } = event.target;
    const selectedOptions = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setSettings((prevSettings) => ({
      ...prevSettings,
      webscrapeSites: selectedOptions,
    }));
    setIsSubmitEnabled(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send settings to the server
    // Example: fetch('/api/settings', { method: 'POST', body: JSON.stringify(settings) });
    setIsSubmitEnabled(false);
  };

  return (
    <Layout>
      <div style={{ "text-align": "-webkit-center" }}>
        <div className="container fieldset">
          <h1 className="legend" style={{ float: "left" }}>
            Settings
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="container mt-5" style={{ "text-align": "start" }}>
              <div className="row">
                <div className="col-sm" style={{ "text-align": "right" }}>
                  <label htmlFor="auto_apply" style={{ color: "white" }}>
                    Auto Apply:
                  </label>
                </div>
                <div className="col-sm">
                  <input
                    type="checkbox"
                    id="auto_apply"
                    name="autoApply"
                    checked={settings.autoApply}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm" style={{ "text-align": "right" }}>
                  <label
                    htmlFor="job_fetching_schedule"
                    style={{ color: "white" }}
                  >
                    Jobs Fetching Schedule:
                  </label>
                </div>
                <div className="col-sm">
                  <input
                    type="datetime-local"
                    id="job_fetching_schedule"
                    name="jobFetchingSchedule"
                    value={settings.jobFetchingSchedule}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm" style={{ "text-align": "right" }}>
                  <label htmlFor="webscrape_sites" style={{ color: "white" }}>
                    Webscrape Sites:
                  </label>
                </div>
                <div className="col-sm">
                  <select
                    id="webscrape_sites"
                    name="webscrapeSites"
                    multiple
                    value={settings.webscrapeSites}
                    onChange={handleMultiSelectChange}
                  >
                    <option value="indeed">Indeed</option>
                    <option value="linkedin">LinkedIn</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-sm" style={{ "text-align": "right" }}>
                  <label htmlFor="match_score_cutoff">
                    Match Score Cutoff:
                  </label>
                </div>
                <div className="col-sm">
                  <input
                    type="number"
                    id="match_score_cutoff"
                    name="matchScoreCutoff"
                    value={settings.matchScoreCutoff}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm"></div>
                <div className="col-sm">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    id="submit-btn"
                    disabled={!isSubmitEnabled}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
