import React, { useState, useEffect } from "react";
import "./Notifications.css";

const Notifications = ({ notificationsData, onUpdate }) => {
  const [activeSubtab, setActiveSubtab] = useState("email");
  const [localData, setLocalData] = useState(notificationsData);

  useEffect(() => {
    setLocalData(notificationsData);
  }, [notificationsData]);

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setLocalData((prevData) => ({
      ...prevData,
      [id]: checked,
    }));
  };

  const handleSelectChange = (e) => {
    const { id, value } = e.target;
    setLocalData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleTimeChange = (e) => {
    const { id, value } = e.target;
    setLocalData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  useEffect(() => {
    onUpdate(localData);
  }, [localData, onUpdate]);

  const renderSubtabContent = () => {
    switch (activeSubtab) {
      case "email":
        return (
          <div className="subtab-content">
            <div className="form-group">
              <input
                type="checkbox"
                id="receive_email_alerts"
                checked={localData?.receive_email_alerts || false}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="receive_email_alerts">Receive Email Alerts</label>
            </div>
            <div className="form-group">
              <input
                type="checkbox"
                id="job_match_alerts"
                checked={localData?.job_match_alerts || false}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="job_match_alerts">Job Match Alerts</label>
            </div>
            <div className="form-group">
              <input
                type="checkbox"
                id="application_status_updates"
                checked={localData?.application_status_updates || false}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="application_status_updates">
                Application Status Updates
              </label>
            </div>
            <div className="form-group">
              <input
                type="checkbox"
                id="newsletter_subscription"
                checked={localData?.newsletter_subscription || false}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="newsletter_subscription">
                Newsletter Subscription
              </label>
            </div>
          </div>
        );
      case "sms":
        return (
          <div className="subtab-content">
            <div className="form-group">
              <input
                type="checkbox"
                id="receive_sms_alerts"
                checked={localData?.receive_sms_alerts || false}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="receive_sms_alerts">Receive SMS Alerts</label>
            </div>
            <div className="form-group">
              <input
                type="checkbox"
                id="sms_job_match_alerts"
                checked={localData?.sms_job_match_alerts || false}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="sms_job_match_alerts">Job Match Alerts</label>
            </div>
            <div className="form-group">
              <input
                type="checkbox"
                id="sms_application_status_updates"
                checked={localData?.sms_application_status_updates || false}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="sms_application_status_updates">
                Application Status Updates
              </label>
            </div>
          </div>
        );
      case "push":
        return (
          <div className="subtab-content">
            <div className="form-group">
              <input
                type="checkbox"
                id="enable_push_notifications"
                checked={localData?.enable_push_notifications || false}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="enable_push_notifications">
                Enable Push Notifications
              </label>
            </div>
            <div className="form-group">
              <input
                type="checkbox"
                id="push_job_match_alerts"
                checked={localData?.push_job_match_alerts || false}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="push_job_match_alerts">Job Match Alerts</label>
            </div>
            <div className="form-group">
              <input
                type="checkbox"
                id="push_application_status_updates"
                checked={localData?.push_application_status_updates || false}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="push_application_status_updates">
                Application Status Updates
              </label>
            </div>
          </div>
        );
      case "frequency":
        return (
          <div className="subtab-content">
            <div className="form-group">
              <label htmlFor="frequency">Frequency</label>
              <select
                id="frequency"
                value={localData?.frequency || ""}
                onChange={handleSelectChange}
              >
                <option value="instantly">Instantly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
          </div>
        );
      case "do_not_disturb":
        return (
          <div className="subtab-content">
            <div className="form-group">
              <input
                type="checkbox"
                id="do_not_disturb"
                checked={localData?.do_not_disturb || false}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="do_not_disturb">Enable Do Not Disturb Mode</label>
            </div>
            <div className="form-inline">
              <div className="form-group">
                <label htmlFor="start_time">Start Time</label>
                <input
                  type="time"
                  id="start_time"
                  value={localData?.start_time || ""}
                  onChange={handleTimeChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="end_time">End Time</label>
                <input
                  type="time"
                  id="end_time"
                  value={localData?.end_time || ""}
                  onChange={handleTimeChange}
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="notifications-tab">
      <div className="subtab-nav">
        <button
          className={activeSubtab === "email" ? "active" : ""}
          onClick={() => setActiveSubtab("email")}
        >
          Email
        </button>
        <button
          className={activeSubtab === "sms" ? "active" : ""}
          onClick={() => setActiveSubtab("sms")}
        >
          SMS
        </button>
        <button
          className={activeSubtab === "push" ? "active" : ""}
          onClick={() => setActiveSubtab("push")}
        >
          Push
        </button>
        <button
          className={activeSubtab === "frequency" ? "active" : ""}
          onClick={() => setActiveSubtab("frequency")}
        >
          Frequency
        </button>
        <button
          className={activeSubtab === "do_not_disturb" ? "active" : ""}
          onClick={() => setActiveSubtab("do_not_disturb")}
        >
          Do Not Disturb
        </button>
      </div>
      <hr className="subtab-hr" />
      <div className="subtab-content-wrapper">{renderSubtabContent()}</div>
    </div>
  );
};

export default Notifications;
