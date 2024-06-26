// src/pages/Login/LoginPage.jsx

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify"; // Importando toast
import "./LoginPage.css";
import "../../styles/Background.css"; // Importa o fundo animado

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Importa o metodo de login do AuthContext
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      if (response.success) {
        // Verifica o login (sucesso), se não notifica erro(senha/usuário inválido)
        toast.success("Login Successful");
        navigate("/home");
      } else {
        toast.error("Login failed. Check your credentials");
      }
    } catch (error) {
      console.error("Login failed", error);
      toast.error("An unexpected error occurred during login");
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
