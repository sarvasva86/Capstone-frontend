import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");


axios.post(
  "https://capstone-server-aa8j.onrender.com/api/auth/signup",
  { name, email, password },
  { headers: { "Content-Type": "application/json" } } 
);

  const handleSignup = async (e) => {
    e.preventDefault();
    
    try {
      // 👇 This is where the API call goes
      const response = await axios.post(
        "https://capstone-server-aa8j.onrender.com/api/auth/signup",
        { name, email, password }
      );
      
      setMessage("Signup successful!");
    } catch (error) {
      setMessage(error.response?.data?.error || "Signup failed!");
    }
  };

  return (
    <form onSubmit={handleSignup}>
      {/* Input fields */}
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Sign Up</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Signup;
