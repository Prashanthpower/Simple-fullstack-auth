import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/details");
        return;
      }
      try {
        const res = await axios.get("http://localhost:5000/api/details/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user details");
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  if (loading) return <div className="welcome-container">Loading...</div>;
  if (error) return <div className="welcome-container">{error}</div>;
  if (!user) return null;

  return (
    <div className="welcome-container">
      <h2>Welcome, {user.name || user.email}!</h2>
      <p>Your degree: {user.degree}</p>
      {user.degree === "BTech" && <p>Branch: {user.branchOrStream}</p>}
      {user.degree === "12th" && <p>Stream: {user.branchOrStream}</p>}
      <p>Thank you for signing up!</p>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
        style={{ marginTop: "20px" }}
      >
        Logout
      </button>
    </div>
  );
};

export default Welcome; 