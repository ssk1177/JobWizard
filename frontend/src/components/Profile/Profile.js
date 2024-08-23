import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileComponent from "./ProfileComponent";
import PersonalInformation from "./PersonalInformation";
import Address from "./Address";
import Settings from "./Settings";
import Documents from "./Documents";
import Notifications from "./Notifications";
import "./Profile.css";
import Layout from "../Layout";

const Profile = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("jwt");

  const [activeTab, setActiveTab] = useState("personalInformation");
  const [userData, setUserData] = useState({});
  const [notificationsData, setNotificationsData] = useState({});
  const [settingsData, setSettingsData] = useState({});
  const [addressData, setAddressData] = useState([]);
  const [documentData, setDocumentData] = useState({});
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // useEffect(() => {
  //   const fetchProfileData = async () => {
  //     try {
  //       const response = await axios.get("/get_profile");
  //       const data = response.data;
  //       setUserData(data.user);
  //       setAddressData(data.address);
  //       setDocumentData(data.documents);
  //       setNotificationsData(data.notification_settings);
  //       setSettingsData(data.settings);
  //     } catch (error) {
  //       //console.error("Error fetching profile data:", error);
  //     }
  //   };
  //   fetchProfileData();
  // }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${API_URL}/get_profile`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = response.data;

        console.log("data:", data);

        if(response.status === 200) {
          if (data.user_info) setUserData(data.user_info);
          if (data.address) setAddressData(data.address);
          if (data.documents) setDocumentData(data.documents);
          if (data.notification_settings)
            setNotificationsData(data.notification_settings);
          if (data.settings) setSettingsData(data.settings);
        }
      } catch (error) {
        // Optionally log the error, but avoid console errors for missing data
        // console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "personalInformation":
        return (
          <PersonalInformation userData={userData} onUpdate={setUserData} />
        );
      case "address":
        return <Address addressData={addressData} onUpdate={setAddressData} />;
      case "documents":
        return (
          <Documents documentData={documentData} onUpdate={setDocumentData} />
        );
      case "notifications":
        return (
          <Notifications
            notificationsData={notificationsData}
            onUpdate={setNotificationsData}
          />
        );
      case "settings":
        return (
          <Settings settingsData={settingsData} onUpdate={setSettingsData} />
        );
      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("user_info", JSON.stringify(userData));
    formData.append("address", JSON.stringify(addressData));
    formData.append("settings", JSON.stringify(settingsData));
    formData.append("notification_settings", JSON.stringify(notificationsData));

    console.log("notificationsData:", notificationsData);
    //Append document files separately
    if (documentData != null) {
      console.log("documentData:", documentData);
      console.log("documentData-resume:", documentData.resume);
      console.log("documentData-cl:", documentData.coverLetter);
      if (documentData.resume) formData.append("resume", documentData.resume);
    
      if (documentData.coverLetter)
         formData.append("coverLetter", documentData.coverLetter);
    }

    try {
      console.log("from profile we sent, formData:", formData);

      const response = await axios.post(`${API_URL}/update_profile`, formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setPopupMessage("Profile updated successfully!");
      console.log("Profile updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      setPopupMessage("Error updating profile. Please try again.");
    } finally {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 5000); // Auto close popup after 3 seconds
    }
  };

  return (
    <Layout>
      <div className="profile-container">
        <div className="profile-sidebar">
          <ProfileComponent />
        </div>
        <div className="profile-details">
          <div className="tabs">
            <button
              style={{ width: "190px" }}
              className={`tab ${
                activeTab === "personalInformation" ? "active" : ""
              }`}
              onClick={() => setActiveTab("personalInformation")}
            >
              Personal Information
            </button>
            <button
              style={{ width: "160px" }}
              className={`tab ${activeTab === "address" ? "active" : ""}`}
              onClick={() => setActiveTab("address")}
            >
              Address
            </button>
            <button
              style={{ width: "160px" }}
              className={`tab ${activeTab === "documents" ? "active" : ""}`}
              onClick={() => setActiveTab("documents")}
            >
              Documents
            </button>
            <button
              style={{ width: "190px" }}
              className={`tab ${activeTab === "notifications" ? "active" : ""}`}
              onClick={() => setActiveTab("notifications")}
            >
              Notifications
            </button>
            <button
              style={{ width: "160px" }}
              className={`tab ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              Settings
            </button>
          </div>
          <div className="tab-content">{renderTabContent()}</div>
          <button className="btn btn=primary update-btn" onClick={handleSubmit}>
            Save Changes
          </button>
        </div>
      </div>
      {showPopup && (
        <div className="popup">
          <p>{popupMessage}</p>
        </div>
      )}
    </Layout>
  );
};

export default Profile;
