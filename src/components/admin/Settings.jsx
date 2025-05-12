import React, { useState } from "react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [schoolInfo, setSchoolInfo] = useState({
    name: "Elementary School",
    address: "Saavedra St, Zamboanga, 7000 Zamboanga del Sur",
    phone: "(123) 456-7890",
    email: "school@example.edu",
    principal: "Miss Principal",
    schoolYear: "2023-2024",
  });

  const [userAccounts, setUserAccounts] = useState([
    {
      id: 1,
      username: "admin",
      role: "admin",
      name: "Admin User",
      email: "admin@school.edu",
    },
    {
      id: 2,
      username: "teacher1",
      role: "teacher",
      name: "Adam Teacher",
      email: "adam@school.edu",
    },
    {
      id: 3,
      username: "parent1",
      role: "parent",
      name: "Jovin Parent",
      email: "Jovin@example.com",
    },
  ]);

  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: "daily",
    backupLocation: "cloud",
    lastBackup: "2023-05-15 08:30:00",
  });

  const [newUserData, setNewUserData] = useState({
    username: "",
    role: "teacher",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSchoolInfoChange = (e) => {
    const { name, value } = e.target;
    setSchoolInfo({
      ...schoolInfo,
      [name]: value,
    });
  };

  const handleBackupSettingChange = (e) => {
    const { name, value } = e.target;
    setBackupSettings({
      ...backupSettings,
      [name]: value,
    });
  };

  const handleBackupCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setBackupSettings({
      ...backupSettings,
      [name]: checked,
    });
  };

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUserData({
      ...newUserData,
      [name]: value,
    });
  };

  const handleSaveSchoolInfo = (e) => {
    e.preventDefault();
    // In a real app, send to backend
    alert("School information saved!");
  };

  const handleSaveBackupSettings = (e) => {
    e.preventDefault();
    // In a real app, send to backend
    alert("Backup settings saved!");
  };

  const handleAddUser = (e) => {
    e.preventDefault();

    // Basic validation
    if (!newUserData.username || !newUserData.name || !newUserData.email) {
      alert("Please fill in all required fields");
      return;
    }

    if (newUserData.password !== newUserData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Add new user
    const newUser = {
      id: Date.now(),
      username: newUserData.username,
      role: newUserData.role,
      name: newUserData.name,
      email: newUserData.email,
    };

    setUserAccounts([...userAccounts, newUser]);

    // Reset form
    setNewUserData({
      username: "",
      role: "teacher",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    alert("User added successfully!");
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUserAccounts(userAccounts.filter((user) => user.id !== id));
    }
  };

  const handleManualBackup = () => {
    // In a real app, trigger a backup process
    alert("Manual backup started...");
    // Update last backup time
    setBackupSettings({
      ...backupSettings,
      lastBackup: new Date().toLocaleString(),
    });
  };

  return (
    <div className="settings">
      <div className="panel-header">
        <h2>System Settings</h2>
      </div>

      <div className="settings-tabs">
        <button
          className={activeTab === "general" ? "active" : ""}
          onClick={() => setActiveTab("general")}
        >
          General
        </button>
        <button
          className={activeTab === "users" ? "active" : ""}
          onClick={() => setActiveTab("users")}
        >
          User Accounts
        </button>
        <button
          className={activeTab === "backup" ? "active" : ""}
          onClick={() => setActiveTab("backup")}
        >
          Backup & Restore
        </button>
      </div>

      <div className="settings-content">
        {activeTab === "general" && (
          <div className="general-settings">
            <h3>School Information</h3>
            <form onSubmit={handleSaveSchoolInfo}>
              <div className="form-group">
                <label>School Name:</label>
                <input
                  type="text"
                  name="name"
                  value={schoolInfo.name}
                  onChange={handleSchoolInfoChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Address:</label>
                <textarea
                  name="address"
                  value={schoolInfo.address}
                  onChange={handleSchoolInfoChange}
                  required
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number:</label>
                  <input
                    type="text"
                    name="phone"
                    value={schoolInfo.phone}
                    onChange={handleSchoolInfoChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={schoolInfo.email}
                    onChange={handleSchoolInfoChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Principal:</label>
                  <input
                    type="text"
                    name="principal"
                    value={schoolInfo.principal}
                    onChange={handleSchoolInfoChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>School Year:</label>
                  <input
                    type="text"
                    name="schoolYear"
                    value={schoolInfo.schoolYear}
                    onChange={handleSchoolInfoChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="save-button">
                Save Changes
              </button>
            </form>
          </div>
        )}

        {activeTab === "users" && (
          <div className="user-settings">
            <div className="user-list">
              <h3>User Accounts</h3>
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userAccounts.map((user) => (
                    <tr key={user.id}>
                      <td>{user.username}</td>
                      <td>{user.name}</td>
                      <td>{user.role}</td>
                      <td>{user.email}</td>
                      <td>
                        <button className="reset-button">Reset Password</button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="delete-button"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="add-user">
              <h3>Add New User</h3>
              <form onSubmit={handleAddUser}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Username*:</label>
                    <input
                      type="text"
                      name="username"
                      value={newUserData.username}
                      onChange={handleNewUserChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Role*:</label>
                    <select
                      name="role"
                      value={newUserData.role}
                      onChange={handleNewUserChange}
                      required
                    >
                      <option value="admin">Administrator</option>
                      <option value="teacher">Teacher</option>
                      <option value="parent">Parent</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name*:</label>
                    <input
                      type="text"
                      name="name"
                      value={newUserData.name}
                      onChange={handleNewUserChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Email*:</label>
                    <input
                      type="email"
                      name="email"
                      value={newUserData.email}
                      onChange={handleNewUserChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Password*:</label>
                    <input
                      type="password"
                      name="password"
                      value={newUserData.password}
                      onChange={handleNewUserChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Confirm Password*:</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={newUserData.confirmPassword}
                      onChange={handleNewUserChange}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="add-button">
                  Add User
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === "backup" && (
          <div className="backup-settings">
            <div className="backup-status">
              <h3>Backup Status</h3>
              <div className="status-info">
                <p>
                  <strong>Last Backup:</strong> {backupSettings.lastBackup}
                </p>
                <button onClick={handleManualBackup} className="backup-button">
                  Backup Now
                </button>
                <button className="restore-button">Restore from Backup</button>
              </div>
            </div>

            <div className="backup-configuration">
              <h3>Backup Configuration</h3>
              <form onSubmit={handleSaveBackupSettings}>
                <div className="form-group checkbox-group">
                  <input
                    type="checkbox"
                    id="autoBackup"
                    name="autoBackup"
                    checked={backupSettings.autoBackup}
                    onChange={handleBackupCheckboxChange}
                  />
                  <label htmlFor="autoBackup">Enable automatic backups</label>
                </div>

                <div className="form-group">
                  <label>Backup Frequency:</label>
                  <select
                    name="backupFrequency"
                    value={backupSettings.backupFrequency}
                    onChange={handleBackupSettingChange}
                    disabled={!backupSettings.autoBackup}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Backup Location:</label>
                  <select
                    name="backupLocation"
                    value={backupSettings.backupLocation}
                    onChange={handleBackupSettingChange}
                  >
                    <option value="local">Local Storage</option>
                    <option value="cloud">Cloud Storage</option>
                  </select>
                </div>

                <button type="submit" className="save-button">
                  Save Backup Settings
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
