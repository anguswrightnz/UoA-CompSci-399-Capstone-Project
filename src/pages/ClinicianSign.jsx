import "./AdminLogin.css";
import "./ClinicianSign.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export function BackToHomeLink() {
  return (
    <>
      <div className="back-to-home">
        <i className="fa-solid fa-arrow-left" id="back-arrow"></i>
        <Link style={{ textDecoration: "none" }} to="/home">
          <div className="back-to-home-text">Back to Home</div>
        </Link>
      </div>
    </>
  );
}

export function AdminLoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false); // Set initial state to true

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  return (
    <>
      <div className="container-clincian split left">
        <div className="box-clinician">
          <div className="box-clincian-details" id="login">
            <div className="top-header">
              <h3>Welcome Back!</h3>
              <div className="divider"></div>
            </div>
            <div className="input-group">
              <div className="input-field">
                <input
                  type="text"
                  className="input-box"
                  id="logEmail"
                  required
                />
                <label htmlFor="logEmail">Email Address</label>
              </div>
              <div className="input-field">
                <input
                  type="submit"
                  className="input-submit"
                  value="Continue"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function AdminLoginInfo() {
  return (
    <>
      <div className="admin-login-info split right">
        <div className="info-content">
          <img src="#" alt="" className="verify-logo" />
          <p className="info-text">
            This is the login for admins only. Please return to the home page if
            you are not a staff member.
            <br />
            <br />
            <br />
            <br />
            If you have trouble logging in, please contact
            techsupportverify@gmail.com
          </p>
        </div>
      </div>
    </>
  );
}

export function ClinicianSignComponents() {
  return (
    <>
      <div className="container">
        <div className="login-wrapper">
          <div className="login-column">
            <BackToHomeLink />
            <AdminLoginForm />
          </div>
          <div className="info-column">
            <AdminLoginInfo />
          </div>
        </div>
      </div>
    </>
  );
}