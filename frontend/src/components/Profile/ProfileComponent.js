import React, { useState, useEffect } from "react";
import axios from "axios";
import default_icon from "../../assets/images/profile-default-icon.png";
import "./ProfileComponent.css";
import EditIcon from "@mui/icons-material/Edit";

const ProfileComponent = () => {
  const [userImage, setUserImage] = useState(default_icon);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("/get_user_profile");
        if (response.status === 200) {
          const { username, role, imageUrl } = response.data.data;
          setUsername(username);
          setUserRole(role);
          if (imageUrl) {
            setUserImage(imageUrl);
          }
        }
      } catch (error) {
        //console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const validTypes = ["image/jpeg", "image/png"];
    const maxSize = 60 * 1024; // 60KB

    if (file) {
      if (!validTypes.includes(file.type)) {
        showError("Only JPEG and PNG images are allowed.");
        return;
      }

      if (file.size > maxSize) {
        showError("File size must be less than 60KB.");
        return;
      }

      const formData = new FormData();
      formData.append("image", file);

      setIsUploading(true);
      setErrorMessage("");

      try {
        const response = await axios.post("/upload_image", formData);
        if (response.data.status === 200) {
          setUserImage(response.data.imageUrl);
          console.log(
            "response recived in upload_image:",
            response.data.imageUrl
          );
        } else {
          showError("Error uploading image. Please try again.");
        }
      } catch (error) {
        showError("Error uploading image. Please try again.");
        //console.error("Error uploading image:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const showError = (message) => {
    setErrorMessage(message);
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 3000); // Auto close popup after 3 seconds
  };

  return (
    <div className="profile-container" style={{ "flex-direction": "column" }}>
      <div className="profile-image-container">
        <img src={userImage} alt="User" className="profile-image" />
        <label htmlFor="imageUpload" className="edit-image-icon">
          <EditIcon />
        </label>
        <input
          type="file"
          id="imageUpload"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        {isUploading && <p>Uploading...</p>}
      </div>
      <div className="profile-info">
        <h2>{username}</h2>
        <p>{userRole}</p>
      </div>

      {showPopup && (
        <div className="popup">
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
