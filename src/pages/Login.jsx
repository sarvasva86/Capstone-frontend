import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css"; // Import CSS file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post( "https://capstone-server-aa8j.onrender.com/api/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      alert("Login Successful!");
    } catch (error) {
      alert("Login Failed!");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;

