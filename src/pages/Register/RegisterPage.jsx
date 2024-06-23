import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify"; // Importando toast
import "./RegisterPage.css";
import "../../styles/Background.css"; // Importa o fundo animado

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/user/register`, {
        username,
        password,
      }); // Requisição para a API(registrar usuário)
      toast.success("Registration Successful. Please Login");
      navigate("/");
    } catch (error) {
      console.error("Registration failed", error);
      toast.error("Registration Failed. User may already exist");
    }
  };

  return (
    <div className="animated-background">
      <div className="register-page">
        <h1 className="studentflow-title">StudentFlow</h1>
        <div className="register-container">
          <form className="register-form" onSubmit={handleSubmit}>
            <h2>Register</h2>
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
            <button type="submit">Register</button>
            <div className="register-section">
              <p>Don't have an account?</p>
              <Link to="/">
                <button type="button">Login</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
