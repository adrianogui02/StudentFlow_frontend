import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // importando login e usuario logado
  const location = useLocation();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setDropdownVisible(false); // Fechar dropdown ao fazer logout
    // Emitir uma notificação de logout
    toast.info("Logged Out Successful");
  };

  // Condição para exibir ou esconder a navbar dependendo da página renderizada
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
        <div className="navbar-user-info" onClick={toggleDropdown}>
          <span className="navbar-user">{user?.username}</span>
          <FaUser className="navbar-icon" />
        </div>
        <div className={`navbar-dropdown ${dropdownVisible ? "visible" : ""}`}>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
