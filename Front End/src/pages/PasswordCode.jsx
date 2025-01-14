import "./AdminLogin.css";
import "./PasswordReset.css";
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BackToHomeLink } from "./ClinicianSign";

export function PasswordCodeForm() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleCodeVerification = async (event) => {
    event.preventDefault();

    const url = `https://api.tmstrainingquizzes.com/auth/CheckPasswordReset/${code}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        // Store the code in sessionStorage
        sessionStorage.setItem("resetCode", code);

        // Navigate to the SubmitPasswordReset page
        navigate("/passwordsubmit", { state: { email } });
      } else if (response.status === 400) {
        setError("This code is invalid");
      }
    } catch (error) {
      console.error("Code Verification Error:", error);
      setError("An error occurred during code verification.");
    }
  };

  return (
    <>
      <BackToHomeLink />
      <div className="container">
      <form onSubmit={handleCodeVerification}>
        <div className="container-password split left">
          
          <div className="box-password">
            <div className="box-password-details" id="password-reset-form">
              <div className="top-header">
                <h3>Verification Code</h3>
                <div className="divider"></div>
              </div>
              <div className="input-group">
                <div className="input-field">
                  <input
                    type="text"
                    className="input-box"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    id="verificationCode"
                    required
                  />
                  <label htmlFor="verificationCode">6-digit code</label>
                </div>
                <div className="input-field">
                  <input
                    type="submit"
                    className="input-submit"
                    value="Submit"
                  />
                </div>
              </div>
              {error && <div className="error-message">{error}</div>}
            </div>
          </div>
        </div>
        
      </form>
      </div>
      <div className="admin-login-info split right">
        <div className="info-content">
          <p className="info-text">
            Please note your code will be valid for 30 minutes from when you
            requested it. Check your junk folder as well!
            <br />
            <br />
            <br />
            <br />
            If you have trouble logging in, please contact{" "}
            <a
              style={{ textDecoration: "none", color: "white" }}
              href="mailto:verify.study.tms@gmail.com"
            >
              <b>verify.study.tms@gmail.com</b>
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default PasswordCodeForm;
