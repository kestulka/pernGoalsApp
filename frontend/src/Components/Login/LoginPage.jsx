import React, { useState } from "react";
import styles from "./LoginPage.module.css";

import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleBackToRegister = () => {
    navigate("/register");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();
      console.log("Logged in sucessfully:", data); // kol kas consolej, pabaigus developmenta tokenas randamas localstorage
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.error("Login error", error);
      setError("Failed to login. Please check your credentials.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      {/* rodom errora jei toks yra: */}
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleBackToRegister}>Register an account</button>
    </div>
  );
}

export default LoginPage;
