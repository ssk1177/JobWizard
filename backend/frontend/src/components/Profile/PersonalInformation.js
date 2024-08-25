import React, { useState, useEffect } from "react";
import "./PersonalInformation.css";

const PersonalInformation = ({ userData, onUpdate }) => {
  const [localData, setLocalData] = useState({});

  useEffect(() => {
    if (userData) {
      setLocalData(userData);
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      onUpdate(updatedData); // Notify parent about the change
      return updatedData;
    });
  };

  return (
    <form className="profile-form">
      <div className="form-group">
        <label>First Name</label>
        <input
          type="text"
          name="first_name"
          value={localData.first_name || ""}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input
          type="text"
          name="last_name"
          value={localData.last_name || ""}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="text"
          name="email"
          title="Email can't be changed!!"
          value={localData.email || ""}
          readOnly
        />
      </div>
      <div className="form-group">
        <label>Role</label>
        <input
          type="text"
          name="role"
          value={localData.role || ""}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Phone Number</label>
        <input
          type="text"
          name="phone_number"
          value={localData.phone_number || ""}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default PersonalInformation;
