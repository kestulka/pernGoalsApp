import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../Features/authSlice";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to register");
      }
      const data = await response.json();
      dispatch(setCredentials({ user: data.user, token: data.token }));
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Register Form</h2>
      {/* rodom errora jei toks yra: */}
      {error && <p>{error}</p>}
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
