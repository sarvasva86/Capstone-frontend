import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://capstone-server-aa8j.onrender.com/api/signup", 
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage("Signup successful!"); 
      // Optional: Redirect user or clear form
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage(
        error.response?.data?.error || 
        "Signup failed. Please check your connection."
      );
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
