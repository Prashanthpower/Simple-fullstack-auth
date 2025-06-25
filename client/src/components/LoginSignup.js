import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log("Submitting details:", { email, password, token });
    try {
      if (isLogin) {
        const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
        localStorage.setItem("token", res.data.token);
        navigate("/details");
      } else {
        await axios.post("http://localhost:5000/api/auth/signup", { email, password });
        navigate("/details");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error.response?.data?.message || "Failed to submit form");
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default LoginSignup; 