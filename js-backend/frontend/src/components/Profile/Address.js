import React, { useState, useEffect, useRef } from "react";

const Address = ({ addressData, onUpdate }) => {
  const [localData, setLocalData] = useState({});

  useEffect(() => {
    if (addressData) {
      setLocalData(addressData);
    }
  }, [addressData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      onUpdate(updatedData); // Notify parent about the change
      return updatedData;
    });
  };



  // const [formData, setFormData] = useState({
  //   street: "",
  //   city: "",
  //   state: "",
  //   country: "",
  //   zip: "",
  // });

  // const isFirstRender = useRef(true);

  // useEffect(() => {
  //   console.log("useEffect called in address");
  //   if (addressData && isFirstRender.current) {
  //     setFormData({
  //       street: addressData.street || "",
  //       city: addressData.city || "",
  //       state: addressData.state || "",
  //       country: addressData.country || "",
  //       zip: addressData.zip || "",
  //     });
  //     isFirstRender.current = false;
  //   }
  // }, [addressData]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log("name:", name, "value", value)
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // useEffect(() => {
  //   console.log('useEffect-onUpdate called in address')
  //   onUpdate(formData);
  // }, [formData, onUpdate]);

  return (
    <form className="profile-form">
      <div className="form-group">
        <label>Street Address</label>
        <input
          type="text"
          name="street"
          value={localData.street || ""}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>City</label>
        <input
          type="text"
          name="city"
          value={localData.city || ""}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Province/State</label>
        <input
          type="text"
          name="state"
          value={localData.state || ""}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Country</label>
        <input
          type="text"
          name="country"
          value={localData.country || ""}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Zip/Postal Code</label>
        <input
          type="text"
          name="zip"
          value={localData.zip || ""}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default Address;
