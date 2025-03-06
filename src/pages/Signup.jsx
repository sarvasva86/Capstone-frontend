import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Signup.css"; // Make sure to create this CSS file

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("Creating your account...");

    try {
      const response = await axios.post(
        "https://capstone-server-aa8j.onrender.com/api/auth/signup",
        { name, email, password },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 10000
        }
      );

      if (response.data.message === "Signup successful") {
        setMessage("🎉 Signup successful! Redirecting to login...");
        setTimeout(() => {
          window.location.href = "/login"; // Use your actual login route
        }, 2000);
      }
    } catch (error) {
      let errorMessage = "Signup failed. Please try again.";
      
      if (error.response) {
        // Server responded with error status
        errorMessage = error.response.data.error || 
                      error.response.data.message || 
                      `Server error (${error.response.status})`;
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = "No response from server. Check your connection.";
      } else {
        // Other errors
        errorMessage = error.message || "Failed to process request";
      }

      setMessage(`⚠️ ${errorMessage}`);
      console.error("Signup Error Details:", {
        config: error.config,
        response: error.response?.data
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Create Your Account</h2>
      <form onSubmit={handleSignup} className="signup-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <button 
          type="submit" 
          className="signup-button"
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Sign Up"}
        </button>

        {message && (
          <div className={`message ${message.includes("⚠️") ? "error" : "success"}`}>
            {message}
          </div>
        )}
      </form>

      <p className="login-link">
        Already have an account? <Link to="/login">Log in here</Link>
      </p>
    </div>
  );
};

export default Signup;
