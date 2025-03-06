
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("Logging in...");

    try {
      const response = await axios.post(
        "https://capstone-server-aa8j.onrender.com/api/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      localStorage.setItem("token", response.data.token);
      setMessage("🎉 Login successful! Redirecting...");
      
      // Redirect to dashboard/home after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {
      const errorMessage = error.response?.data?.error || 
                          "Failed to connect to server";
      setMessage(`⚠️ Error: ${errorMessage}`);
    }
  };

  return (
    <div className="auth-container">
      <h2>Welcome Back!</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="auth-button">
          Login
        </button>
      </form>

      {message && <div className="auth-message">{message}</div>}

      <p className="auth-link">
        New user? <a href="/signup">Create account</a>
      </p>
    </div>
  );
};

export default Login;
