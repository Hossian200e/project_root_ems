import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/styles/auth/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/login/",
        { username, password }
      );

      if (response.data.status === "success") {
        const userType = response.data.user_type;
        if (response.data.permissions) {
          localStorage.setItem(
            "permissions",
            JSON.stringify(response.data.permissions)
          );
        }
        if (userType === "admin") navigate("/AdminDashboard");
        else if (userType === "student") navigate("/StudentDashboard");
        else if (userType === "teacher") navigate("/TeacherDashboard");
      } else {
        setMessage("Login failed");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Error connecting to backend");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        {/* Institute Image */}
        <div className="institute-logo">
          <img src="/assets/images/institute-logo.png" alt="Institute Logo" />
        </div>

        {/* Institute Name */}
        <h2 className="institute-name"> Institute Name</h2>

        {/* Subtitle */}
        <p className="login-subtitle">Log in to continue</p>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="forgot-password">
            <a href="/forgot-password">Forgot password?</a>
          </div>

          <button className="login-btn" type="submit">
            Login
          </button>
        </form>

        {/* Error Message */}
        {message && <p className="error-msg">{message}</p>}

        {/* Footer Message */}
        <p className="footer-msg">
          If you are a student or teacher and do not have an account yet, please contact your institute.
        </p>
      </div>
    </div>
  );
};

export default Login;
