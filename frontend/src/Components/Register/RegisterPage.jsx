import { React, useState } from "react";
import styles from "./RegisterPage.module.css";

import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // grazina i log in page
  const handleBackToLogin = () => {
    navigate("/login");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // siunciam POST requesta i backo API
      // butina specifyinti tikslu adresa is kurio fetchinama
      const response = await fetch("/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, role: "simple" }),
      });
      // jei viskas ok console loginam duomenis ir naviguojam i login page
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate("/login");
      } else {
        throw new Error("Failed to register");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div>
      <h2>Register Form</h2>
      <div className={styles.registerContainer}>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // updatinam username state i irasyta
        ></input>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // updatinam password state i irasyta
        ></input>
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={styles.registerBtn}
          type="submit"
          onClick={handleRegister}
        >
          Create
        </button>
        <button
          className={styles.backBtn}
          type="button"
          onClick={handleBackToLogin}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
