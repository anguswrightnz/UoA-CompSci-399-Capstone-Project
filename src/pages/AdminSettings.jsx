import "./AdminSetting.css";
import AdminDashboard from "../components/Dashboards/ADashboard";
import AdminInfo from "../components/AdminComponent/adminInfo";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "redaxios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
export default function AdminSetting() {
  const navigate = useNavigate();
  const adminToken = sessionStorage.getItem("adminToken");

  const [adminSearch, setAdminSearch] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.tmstrainingquizzes.com/webapi/GetAdmins",
          {
            headers: {
              Authorization: `Bearer ${adminToken}`, // Include token in headers
            },
          }
        );
        setAdminSearch(response.data);
      } catch (error) {
        if (error.response) {
          const { status } = error.response;
          if (status === 401) {
            // Token is invalid or expired, log the user out
            sessionStorage.removeItem("adminLogin");
            navigate("/adminlogin"); // Redirect to login page
          } else if (status === 403) {
            // Not authorized to access resource, redirect to appropriate dashboard
            navigate("/adminlogin"); // Redirect to appropriate dashboard
          }
        } else {
          console.error("Error fetching admins:", error);
        }
      }
    };

    fetchData();
  }, [adminToken, navigate]);

  //FOR GETTING ADMINS NAME
  const [adminID, setAdminID] = useState(0);
  const [admindetails, setAdmindetails] = useState("");
  const [adminfirstName, setAdminFirstName] = useState("");
  const [adminlastName, setAdminLastName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null); // Reference to the admin info box

  // Function to fetch admin information from backend API
  useEffect(() => {
    fetch("https://api.tmstrainingquizzes.com/auth/GetCurrentAdmin", {
      headers: {
        Authorization: `Bearer ${adminToken}`, // Include token in headers
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAdminID(data.adminID); // Set adminID
        setAdminFirstName(data.firstName);
        setAdminLastName(data.lastName);
        setAdminEmail(data.email);
      })
      .catch((error) => {
        console.error("Error fetching admin information:", error);
      });
  }, []);

  //function to check if someone clicked outside the admin info box
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    }

    // Adding click event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [adminToken, navigate]);

  //TO UPDATE ADMIN INFORMATION - works
  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestBody = {
      adminID: adminID,
      firstName: adminfirstName,
      lastName: adminlastName,
      email: adminEmail, // You may need to handle password update separately if needed
    };
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`, // Include token in headers
      },
      body: JSON.stringify(requestBody),
    };
    try {
      const response = await fetch(
        "https://api.tmstrainingquizzes.com/webapi/EditAdmin",
        requestOptions
      );
      if (response.ok) {
        // Update admin details state with the new values
        setAdmindetails(requestBody);
        alert("Admin updated successfully!");
        showMessage("Admin updated successfully!", "role");
      } else if (response.status === 409) {
        throw new Error("A user with this email already exists.");
      } else {
        throw new Error("Failed to update admin");
      }
    } catch (error) {
      console.error("Error updating admin:", error);
      alert(error.message);
    }
  };

  //FUNCTION TO MAKE A NEW ADMIN -works
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmitNewAdmin = async (event) => {
    event.preventDefault();

    const data = {
      firstName,
      lastName,
      email,
      password,
    };

    try {
      const response = await fetch(
        "https://api.tmstrainingquizzes.com/webapi/AddAdmin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        setMessage("Admin user created successfully.");
        showMessage("Admin user created successfully.", "role");
        // Optionally, reset form fields
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
      } else if (response.status === 409) {
        alert(
          "The email you entered already exists. Please use a different email."
        );
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  //ADDING A NEW ROLE AND ORGANISATION - working
  const [roles, setRoles] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [searchRole, setSearchRole] = useState("");
  const [searchOrg, setSearchOrg] = useState("");
  const [roleMessage, setRoleMessage] = useState("");
  const [organizationMessage, setOrganizationMessage] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    fetchRoles();
    fetchOrganizations();
  }, []);

  const fetchRoles = async () => {
    const rolesApiUrl = "https://api.tmstrainingquizzes.com/webapi/GetRoles";
    try {
      const response = await fetch(rolesApiUrl, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      const data = await response.json();
      const filteredData = data.slice(0, -1);
      setRoles(filteredData);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const fetchOrganizations = async () => {
    const organizationsApiUrl =
      "https://api.tmstrainingquizzes.com/webapi/GetOrganizations";
    try {
      const response = await fetch(organizationsApiUrl, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      const data = await response.json();
      const filteredData = data.slice(0, -1);
      setOrganizations(filteredData);
    } catch (error) {
      console.error("Error fetching organizations:", error);
    }
  };

  //HANDLING SUBMIT NEW ROLE
  const handleRoleSubmit = async () => {
    const roleApiUrl = "https://api.tmstrainingquizzes.com/webapi/AddRole";
    const rolePayload = { roleName: searchRole };

    try {
      const response = await fetch(roleApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(rolePayload),
      });

      if (response.ok) {
        setRoleMessage("Role added successfully!");
        showMessage("Role added successfully!", "role");
        setSearchRole("");
        fetchRoles();
      } else {
        const errorData = await response.json();
        setRoleMessage(`Error adding role: ${errorData.message}`);
      }
    } catch (error) {
      setRoleMessage(`Error adding role: ${error.message}`);
    }
  };
  //HANDLING SUBMIT NEW ORGANISATION

  const handleOrgSubmit = async () => {
    const organizationApiUrl =
      "https://api.tmstrainingquizzes.com/webapi/AddOrganization";
    const organizationPayload = { orgName: searchOrg };

    try {
      const response = await fetch(organizationApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(organizationPayload),
      });

      if (response.ok) {
        setOrganizationMessage("Organization added successfully!");
        showMessage("Organization added successfully!", "organization");
        setSearchOrg("");
        fetchOrganizations();
      } else {
        const errorData = await response.json();
        setOrganizationMessage(
          `Error adding organization: ${errorData.message}`
        );
      }
    } catch (error) {
      setOrganizationMessage(`Error adding organization: ${error.message}`);
    }
  };
  const [showRoleMessage, setShowRoleMessage] = useState(false);
  const [showOrganizationMessage, setShowOrganizationMessage] = useState(false);

  // Function to show message and hide it after 3 seconds
  const showMessage = (message, type) => {
    switch (type) {
      case "role":
        setShowRoleMessage(true);
        break;
      case "organization":
        setShowOrganizationMessage(true);
        break;
    }
    setTimeout(() => {
      switch (type) {
        case "role":
          setShowRoleMessage(false);
          break;
        case "organization":
          setShowOrganizationMessage(false);
          break;
      }
    }, 3000); // Hide message after 3 seconds
  };

  // JSX rendering remains largely unchanged
  // Ensure to conditionally render messages based on showRoleMessage and showOrganizationMessage
  {
    showRoleMessage && <p>{roleMessage}</p>;
  }
  {
    showOrganizationMessage && <p>{organizationMessage}</p>;
  }

  //HANDLING DELETING ROLE
  const handleDeleteRole = async (roleID) => {
    const deleteRoleApiUrl = `https://api.tmstrainingquizzes.com/webapi/DeleteRole/${parseInt(
      roleID
    )}`;

    try {
      const response = await fetch(deleteRoleApiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      });

      if (response.ok) {
        setRoleMessage("Role deleted successfully!");
        showMessage("Role deleted successfully!", "role");
        fetchRoles();
      } else {
        const errorData = await response.json();
        setRoleMessage(`Error deleting role: ${errorData.message}`);
      }
    } catch (error) {
      setRoleMessage(`Error deleting role: ${error.message}`);
    }
  };

  //HANDLING DELETE ORGANISATION
  const handleDeleteOrg = async (orgID) => {
    const deleteOrgApiUrl = `https://api.tmstrainingquizzes.com/webapi/DeleteOrganization/${parseInt(
      orgID
    )}`;

    try {
      const response = await fetch(deleteOrgApiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      });

      if (response.ok) {
        setOrganizationMessage("Organization deleted successfully!");
        showMessage("Organization deleted successfully!", "organization");

        fetchOrganizations();
      } else {
        const errorData = await response.json();
        setOrganizationMessage(
          `Error deleting organization: ${errorData.message}`
        );
      }
    } catch (error) {
      setOrganizationMessage(`Error deleting organization: ${error.message}`);
    }
  };

  const filteredRoles = roles.filter((role) =>
    role.roleName.toLowerCase().includes(searchRole.toLowerCase())
  );

  const filteredOrganizations = organizations.filter((org) =>
    org.orgName.toLowerCase().includes(searchOrg.toLowerCase())
  );

  return (
    <>
      <div className="admin-body-settings"></div>
      <AdminInfo />
      <div className="dashboard-container">
        <AdminDashboard />
      </div>
      <section className="settings">
        <div className="container-settings">
          <div className="accordion">
            <div className="accordion-item" id="adminprofile">
              <a className="accordion-link" href="#adminprofile">
                Profile <i className="fa-solid fa-caret-down"></i>
                <i className="fa-solid fa-caret-up"></i>
              </a>
              <div className="information-text">
                <p className="information-text">Edit your details.</p>
              </div>
              <form className="information" onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="input-box-settings-change"
                  id="firstname"
                  value={adminfirstName}
                  placeholder="First Name"
                  onChange={(e) => setAdminFirstName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="input-box-settings-change"
                  id="lastname"
                  value={adminlastName}
                  placeholder="Last Name"
                  onChange={(e) => setAdminLastName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  className="input-box-settings-change"
                  id="email"
                  value={adminEmail}
                  placeholder="Email"
                  onChange={(e) => setAdminEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn-settings">
                  Save Changes
                </button>
              </form>
            </div>
            {/* ADD NEW ADMIN */}
            <div className="accordion-item" id="addnewadmin">
              <a className="accordion-link" href="#addnewadmin">
                Add New Admin <i className="fa-solid fa-caret-down"></i>
                <i className="fa-solid fa-caret-up"></i>
              </a>
              <div className="information-text">
                <p className="information-text">
                  Once you submit this information, please contact the recipient
                  with their login information and prompt them to reset their
                  password.
                </p>
              </div>
              <form onSubmit={handleSubmitNewAdmin} className="information">
                <input
                  type="text"
                  className="input-box-settings-change"
                  id="firstname"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="input-box-settings-change"
                  id="lastname"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="input-box-settings-change"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="input-box-settings-change"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit" className="btn-settings">
                  Submit
                </button>
              </form>
              {message && <p>{message}</p>}
            </div>
            {/* SHOWS A LIST OF ADMINS */}
            <div className="accordion-item" id="admins">
              <a className="accordion-link" href="#admins">
                Admins <i className="fa-solid fa-caret-down"></i>
                <i className="fa-solid fa-caret-up"></i>
              </a>

              <div className="admin-search-Container">
                <div className="quizModuleresults">
                  {adminSearch.map((adminSearchs) => (
                    <div
                      key={adminSearchs.adminID}
                      className="admin-search-item"
                    >
                      <div className="adminName">
                        {adminSearchs.firstName} {adminSearchs.lastName}
                      </div>
                      <div className="adminEmail">{adminSearchs.email}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* SITES AND DISCIPLINES */}
            <div className="accordion-item" id="changeRegistration">
              <a className="accordion-link" href="#changeRegistration">
                Sites & Disciplines
                <i className="fa-solid fa-caret-down"></i>
                <i className="fa-solid fa-caret-up"></i>
              </a>
              <div className="information-text">
                <p className="information-text">
                  You may add new Sites and Disciplines by entering relevant
                  information in the boxes below and submitting it.
                </p>
              </div>
              <div className="information-container">
                <div className="information-ro">
                  <h3>Disciplines</h3>
                  <div className="input-container">
                    <input
                      type="text"
                      className="input-box-settings"
                      placeholder="Search or Add Disciplines"
                      value={searchRole}
                      onChange={(e) => setSearchRole(e.target.value)}
                    />
                    <button
                      className="btn-settings"
                      onClick={() => handleRoleSubmit()}
                      disabled={filteredRoles.length > 0}
                    >
                      Add Discipline
                    </button>
                  </div>
                  {showRoleMessage && <p>{roleMessage}</p>}
                  <ul className="scrollable-list">
                    {filteredRoles.map((role) => (
                      <li key={role.roleID}>
                        <div className="card">
                          <div className="card-content">{role.roleName}</div>
                          <div className="trash-container">
                            <button
                              className="trash-settings"
                              onClick={() => handleDeleteRole(role.roleID)}
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="fa-lg"
                              />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="information-ro">
                  <h3>Sites</h3>
                  <div className="input-container">
                    <input
                      type="text"
                      className="input-box-settings"
                      placeholder="Search or Add Sites"
                      value={searchOrg}
                      onChange={(e) => setSearchOrg(e.target.value)}
                    />
                    <button
                      className="btn-settings"
                      onClick={() => handleOrgSubmit()}
                      disabled={filteredOrganizations.length > 0}
                    >
                      Add Site
                    </button>
                  </div>
                  {showOrganizationMessage && <p>{organizationMessage}</p>}
                  <ul className="scrollable-list">
                    {filteredOrganizations.map((org) => (
                      <li key={org.orgID}>
                        <div className="card">
                          <div className="card-content">{org.orgName}</div>
                          <div className="trash-container">
                            <button
                              className="trash-settings"
                              onClick={() => handleDeleteOrg(org.orgID)}
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="fa-lg"
                              />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
