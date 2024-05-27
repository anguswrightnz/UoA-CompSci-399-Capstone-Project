import React from "react";
import "./ADashboard.css";
import { Link, useLocation} from "react-router-dom";
import logo from "../VERIFYLogo.jpg";

function AdminDashboard() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div className="Admindashboard-container">
      <div className="Adminlogo-container">
      <a href="/adminsearch">
        <img
          className="Adminlogo"
          loading="lazy"
          src={logo}
          alt="DashboardLogo"
        />
      </a>
      </div>
      <Link style={{ textDecoration: "none", color: "white" }} to="/EditQuiz">
        <button className={`Adminbutton ${isActive("/EditQuiz")}`}>Edit Quiz</button>
      </Link>

      <Link style={{ textDecoration: "none", color: "white" }} to="/adminsearch">
        <button className={`Adminbutton ${isActive("/adminsearch")}`}>Clinicians</button>
      </Link>

      <Link style={{ textDecoration: "none", color: "white" }} to="/adminStats">
        <button className={`Adminbutton ${isActive("/adminStats")}`}>Statistics</button>
      </Link>

      <br></br>

      <Link style={{ textDecoration: "none", color: "white" }} to="/adminSettings">
        <button className={`Adminbutton ${isActive("/adminSettings")}`}>Settings</button>
      </Link>


    </div>
  );
}

export default AdminDashboard;
