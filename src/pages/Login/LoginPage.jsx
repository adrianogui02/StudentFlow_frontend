import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify"; // Importando toast
import "./LoginPage.css";
import "../../styles/Background.css"; // Importa o fundo animado

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/login`,
        { username, password }
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/home");
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="animated-background">
      <div className="login-page">
        <h1 className="studentflow-title">StudentFlow</h1>
        <div className="login-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit">Login</button>
            <div className="register-section">
              <p>Don't have an account?</p>
              <Link to="/register">
                <button type="button">Register</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
