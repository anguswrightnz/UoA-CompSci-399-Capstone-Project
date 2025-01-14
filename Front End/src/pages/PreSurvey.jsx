import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PrivDiscM from "./PrivDiscM"; // Import the Modal component
import "./PreSurvey.css";

function Presurvey() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [positions, setPositions] = useState([]);
  const [organisations, setOrganisations] = useState([]);
  const [orgIDs, setOrgsID] = useState([]);
  const [roleIDs, setRolesID] = useState([]);
  const [otherRole, setOtherRole] = useState(""); // State for the other role input
  const [isOtherRoleRequired, setIsOtherRoleRequired] = useState(false); // State to manage requirement of other role input

  const [showModal, setShowModal] = useState(true); // State to manage modal visibility
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  function validateEmail(email) {
    return emailRegex.test(email);
  }

  // Fetch positions
  useEffect(() => {
    async function fetchPositions() {
      try {
        const response = await fetch(
          "https://api.tmstrainingquizzes.com/webapi/GetRoles"
        );
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        const roleName = data.map((role) => role.roleName);
        const roleID = data.map((role) => role.roleID);
        setPositions(roleName || []); // Ensure your API returns an object with a 'positions' key
        setPosition(roleName[0]); // Set default position

        setRolesID(roleID);
      } catch (error) {
        console.error("Failed to fetch positions:", error);
      }
    }

    fetchPositions();
  }, []);

  // Fetch organisations
  useEffect(() => {
    async function fetchOrganisations() {
      try {
        const response = await fetch(
          "https://api.tmstrainingquizzes.com/webapi/GetOrganizations"
        );
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        const orgNames = data.map((org) => org.orgName); // Extract orgName from each organisation object
        const orgIDs = data.map((org) => org.orgID);
        setOrganisations(orgNames || []); // Set organisations state to an array of orgName strings
        setOrganisation(orgNames[0]); // Set default organisation (if needed)

        setOrgsID(orgIDs);
      } catch (error) {
        console.error("Failed to fetch organisations:", error);
      }
    }

    fetchOrganisations();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return; // Stop the submission
    }

    if (position === "Other" && !otherRole) {
      alert("Please specify your role.");
      return; // Stop the submission
    }

    // Get the index of the selected position and organization
    const positionIndex = positions.findIndex((pos) => pos === position);
    const organisationIndex = organisations.findIndex(
      (org) => org === organisation
    );

    // Retrieve the corresponding IDs using the indexes
    const roleID = positionIndex !== -1 ? roleIDs[positionIndex] : null;
    const organisationID =
      organisationIndex !== -1 ? orgIDs[organisationIndex] : null;

    const clinicianData = {
      userEmail: email,
      firstName: firstName,
      lastName: lastName,
      roleID: roleID,
      organizationID: organisationID,
      otherRole: position === "Other" ? otherRole : null, // Add otherRole if selected
    };

    try {
      const registrationResponse = await fetch(
        "https://api.tmstrainingquizzes.com/webapi/AddClinician",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(clinicianData),
        }
      );

      if (registrationResponse.ok) {
        // Attempt to log in the user after successful registration
        const loginResponse = await fetch(
          "https://api.tmstrainingquizzes.com/auth/ClinicianLogin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email }),
          }
        );

        const text = await loginResponse.text(); // First get the response as text to check for errors

        if (loginResponse.ok && !text.includes("Login failed")) {
          sessionStorage.setItem("cliniciantoken", text); // Store the token
          navigate("/quizDashboard"); // Redirect to quizDashboard
        } else {
          throw new Error("Login failed after registration");
        }
      } else if (registrationResponse.status === 409) {
        alert("An account with this email already exists.");
        navigate("/cliniciansign");
      } else {
        throw new Error("Failed to register clinician");
      }
    } catch (error) {
      console.error("Error during registration or login:", error);
      alert("Error submitting the form. Please try again.");
    }
  };

  const handleClickBacktoHome = () => {
    navigate("/home");
  };

  const handleClickGottoClinicianSignin = () => {
    navigate("/cliniciansign");
  };

  const handlePositionChange = (e) => {
    const selectedPosition = e.target.value;
    setPosition(selectedPosition);
    setIsOtherRoleRequired(selectedPosition === "Other");
    if (selectedPosition !== "Other") {
      setOtherRole("");
    }
  };

  return (
    <>
      <div className="back-to-home">
        <button
          className="back-to-home-btn"
          style={{ textDecoration: "none", color: "white" }}
          onClick={handleClickBacktoHome}
        >
          <i className="fa-solid fa-arrow-left" id="back-arrow-ps"></i>
          <div className="back-to-home-text">Back To Home</div>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="split-survey left-survey">
          <div className="centered-survey">
            <p className="info-text">
              Please enter the following information to get access to the VERIFY
              TMS quizzes. 
            </p>
            <p className="info-text">
              If you’ve already entered this information, click the “continue
              here" prompt.
            </p>
            <p className="info-text">
              Need Help? If you have any questions or need assistance with the
              registration process, please email us at{" "}
              <a
                style={{ textDecoration: "none", color: "white" }}
                href="mailto:verify.study.tms@gmail.com"
              >
                <b>verify.study.tms@gmail.com</b>
              </a>
              .
            </p>
          </div>
        </div>

        <div className="container-survey split-survey right-survey">
          <div className="box-survey">
            <div className="box-survey-details" id="register-form">
              <div className="top-header">
                <h3>Registration</h3>
                <div className="divider"></div>
              </div>
              <div className="input-group">
                <div className="next-to-group">
                  <div
                    className="input-field next-to"
                    style={{ marginRight: "20px" }}
                  >
                    <input
                      type="text"
                      className="input-box"
                      id="survey-firstName"
                      // placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                    <label htmlFor="survey-firstName">First Name</label>
                  </div>
                  <div className="input-field next-to">
                    <input
                      type="text"
                      className="input-box"
                      id="survey-lastName"
                      // placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                    <label htmlFor="survey-lastName">Last Name</label>
                  </div>
                </div>

                <div className="input-field">
                  <input
                    type="text"
                    className="input-box"
                    id="survey-email"
                    // placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="survey-email">Email Address</label>
                </div>
                <div className="input-field">
                  <select
                    className="input-box"
                    id="survey-role"
                    value={position}
                    onChange={handlePositionChange}
                    required
                  >
                    {positions.map((pos) => (
                      <option key={pos} value={pos}>
                        {pos}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="survey-role">Discipline</label>
                </div>

                {position === "Other" && (
                  <div className="input-field">
                    <input
                      type="text"
                      className="input-box"
                      id="survey-otherRole"
                      value={otherRole}
                      onChange={(e) => setOtherRole(e.target.value)}
                      required={isOtherRoleRequired}
                    />
                    <label htmlFor="survey-otherRole">
                      Specify Your Discipline
                    </label>
                  </div>
                )}

                <div className="input-field">
                  <select
                    className="input-box"
                    id="survey-organisation"
                    value={organisation}
                    onChange={(e) => setOrganisation(e.target.value)}
                    required
                  >
                    {organisations.map((org) => (
                      <option key={org} value={org}>
                        {org}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="survey-organisation">Site</label>
                </div>
                <div className="tc ">
                  <input type="checkbox" className="cb" required />
                  By ticking the box, you agree to the
                  <span
                    className="terms-link"
                    onClick={() => setShowModal(true)}
                  >
                    {" "}
                    <font color="#485696">
                      <strong>
                        <u>Privacy Disclosure</u>
                      </strong>
                    </font>{" "}
                  </span>
                  of the Verify Quiz Platform.
                </div>
                <div className="input-field">
                  <input
                    type="submit"
                    className="input-submit"
                    value="Submit"
                    required
                  />
                </div>
                <div className="or-section">
                  <div className="line"></div>
                  <div className="or-text">OR</div>
                  <div className="line"></div>
                </div>
                <button
                  className="continue-here-clincian"
                  onClick={handleClickGottoClinicianSignin}
                >
                  Continue Here
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <PrivDiscM show={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
}

export default Presurvey;
