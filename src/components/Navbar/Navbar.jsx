import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaUser } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const { user } = useAuth();
  const location = useLocation();

  // Condição para exibir ou esconder a navbar
  if (location.pathname === "/" || location.pathname === "/register") {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/home" className="navbar-brand">
          StudentFlow
        </Link>
      </div>
      <div className="navbar-center">
        <Link to="/students" className="navbar-link">
          Students
        </Link>
      </div>
      <div className="navbar-right">
        <span className="navbar-user">{user?.username}</span>
        <FaUser className="navbar-icon" />
      </div>
    </nav>
  );
};

export default Navbar;
