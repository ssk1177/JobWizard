import React, { useState, useEffect } from "react";
import axios from "axios";
import default_icon from "../../assets/images/profile-default-icon.png";
import "./ProfileComponent.css";
import EditIcon from "@mui/icons-material/Edit";

const ProfileComponent = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("jwt");

  const [userImage, setUserImage] = useState(default_icon);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${API_URL}/get_image`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        });

        if (response.status === 200) {
          const image = URL.createObjectURL(new Blob([response.data]));
          
          // If image is available, use it; otherwise, keep the default image
          if (image && image.trim() !== "") {
            setUserImage(image);
          } else {
            setUserImage(default_icon); // Fallback to default image
          }
        }
      } catch (error) {
        //console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [API_URL, token]);

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
        const response = await axios.post(`${API_URL}/upload_image`, formData, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.data.status === 200) {
          setUserImage(file);
          //setUserImage(URL.createObjectURL(response.data.image));
        } else {
          showError("Error uploading image. Please try again.");
        }
      } catch (error) {
        showError("Error uploading image. Please try again.");
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
