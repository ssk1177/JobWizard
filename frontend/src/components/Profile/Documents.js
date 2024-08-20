import React, { useState, useEffect } from "react";

const Documents = ({ documentData, onUpdate }) => {
  const [initialData, setInitialData] = useState({});
  const [localData, setLocalData] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (Array.isArray(documentData) && !dataLoaded) {
      const data = {};
      documentData.forEach((doc) => {
        if (doc.filetype === "resume") {
          data.resume = doc.filename || null;
          data.resume_uploaded_on = doc.uploaded_on || null;
        } else if (doc.filetype === "coverLetter") {
          data.coverLetter = doc.filename || null;
          data.coverLetter_uploaded_on = doc.uploaded_on || null;
        }
      });

      setInitialData(data);
      setLocalData(data);
      setDataLoaded(true);
    }
  }, [documentData, dataLoaded]);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0] || null;

    setLocalData((prevData) => {
      const updatedData = { ...prevData, [name]: file };
      onUpdate(updatedData);
      console.log("under file change, updatedData", updatedData);
      return updatedData;
    });
  };

  return (
    <form className="profile-form">
      <div className="form-group">
        <label>Resume</label>
        <input type="file" name="resume" onChange={handleFileChange} />
        {initialData.resume && (
          <p>
            <span style={{ fontWeight: "bold", color: "#007bff" }}>
              Uploaded file:
            </span>{" "}
            {initialData.resume} <br />
            <span style={{ fontWeight: "bold", color: "#007bff" }}>
              Uploaded on:
            </span>{" "}
            {initialData.resume_uploaded_on
              ? new Date(initialData.resume_uploaded_on).toLocaleDateString()
              : "N/A"}
          </p>
        )}
      </div>
      <div className="form-group">
        <label>Cover Letter</label>
        <input type="file" name="coverLetter" onChange={handleFileChange} />
        {initialData.coverLetter && (
          <p>
            <span style={{ fontWeight: "bold", color: "#007bff" }}>
              Uploaded file:
            </span>{" "}
            {initialData.coverLetter} <br />
            <span style={{ fontWeight: "bold", color: "#007bff" }}>
              Uploaded on:
            </span>{" "}
            {initialData.coverLetter_uploaded_on
              ? new Date(
                  initialData.coverLetter_uploaded_on
                ).toLocaleDateString()
              : "N/A"}
          </p>
        )}
      </div>
    </form>
  );
};

export default Documents;
