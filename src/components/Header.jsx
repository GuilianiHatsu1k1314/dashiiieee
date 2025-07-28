import React from "react";
import "../assets/styles/header.css";
import Button from "../components/Button";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <h1>📦 Dashiiieee</h1>
      <nav className="nav-container">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <Button
              onClick={() => navigate("/login")}
              className="nav-login-button"
            >
              <p>Login</p>
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
