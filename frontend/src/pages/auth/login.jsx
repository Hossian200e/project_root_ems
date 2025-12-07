import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

        // Redirect based on user type
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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
