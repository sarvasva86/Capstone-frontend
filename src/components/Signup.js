import React, { useState } from "react";
import axios from "axios";
import ".styles/Signup.css"; // Import the CSS

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://capstone-server-aa8j.onrender.com/api/auth/signup",
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      setMessage("🎉 Signup successful! Redirecting...");
      // Clear form
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage(error.response?.data?.error || "⚠️ Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <h1 className="signup-title">Explore the World</h1>
        <p className="signup-subtitle">Create your free account to start planning</p>
      </div>
      
      <form className="signup-form" onSubmit={handleSignup}>
        <div className="form-group">
          <input
            type="text"
            className="form-input"
            placeholder=" "
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label className="form-label">Full Name</label>
        </div>

        <div className="form-group">
          <input
            type="email"
            className="form-input"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="form-label">Email Address</label>
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-input"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="form-label">Password</label>
        </div>

        <button type="submit" className="signup-button">
          Create Account
        </button>
      </form>

      {message && (
        <div className={`signup-message ${message.includes("⚠️") ? "error-message" : ""}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Signup;
