import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DetailsForm = () => {
  const [name, setName] = useState("");
  const [degree, setDegree] = useState("");
  const [branch, setBranch] = useState("");
  const [stream, setStream] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/details",
        {
          name,
          degree,
          branchOrStream: degree === "BTech" ? branch : stream,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/welcome");
    } catch (error) {
      console.error("Error saving details:", error);
    }
  };

  return (
    <div className="details-container">
      <h2>Enter Your Details</h2>
      <form onSubmit={handleSubmit} className="details-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select
          value={degree}
          onChange={(e) => {
            setDegree(e.target.value);
            setBranch("");
            setStream("");
          }}
          required
        >
          <option value="">Select Degree</option>
          <option value="12th">12th</option>
          <option value="BTech">BTech</option>
        </select>
        {degree === "BTech" && (
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            required
          >
            <option value="">Select Branch</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="MECH">MECH</option>
          </select>
        )}
        {degree === "12th" && (
          <select
            value={stream}
            onChange={(e) => setStream(e.target.value)}
            required
          >
            <option value="">Select Stream</option>
            <option value="MPC">MPC</option>
            <option value="BiPC">BiPC</option>
          </select>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DetailsForm; 