import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
  e.preventDefault();
  setMessage("Processing...");
  
  try {
    const response = await axios.post(
      "https://capstone-server-aa8j.onrender.com/api/auth/signup",
      { name, email, password },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        timeout: 10000 // 10 seconds timeout
      }
    );

    if (response.data.message === "Signup successful") {
      setMessage("🎉 Signup successful! Redirecting...");
      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = "/#/login";
      }, 2000);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.error || 
                        error.message || 
                        "Connection failed";
    setMessage(`⚠️ Error: ${errorMessage}`);
    console.error("Signup failed:", error);
  }
};

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        {/* Input fields remain the same */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
