// src/components/auth/Login.jsx - Mock login functionality
import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCredentials({
      ...credentials,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!credentials.username.trim() || !credentials.password.trim()) {
      setError("Please enter both username and password");
      return;
    }

    setIsLoading(true);

    // Mock authentication logic without backend
    setTimeout(() => {
      // Hardcoded credentials check
      if (
        credentials.username === "admin" &&
        credentials.password === "admin123"
      ) {
        login({ id: 1, username: "admin", name: "Admin User" }, "admin");
      } else if (
        credentials.username.startsWith("teacher") &&
        credentials.password === "teacher123"
      ) {
        const section = credentials.username.slice(-1).toUpperCase();
        login(
          {
            id: 2,
            username: credentials.username,
            name: `Teacher ${section}`,
            section: section,
          },
          "teacher"
        );
      } else if (
        credentials.username === "parent" &&
        credentials.password === "parent123"
      ) {
        login({ id: 3, username: "parent", name: "Parent User" }, "parent");
      } else {
        setError("Invalid username or password");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <div className="login-header">
          <h2>Elementary School Learners Profile System</h2>
        </div>

        <div className="login-tabs">
          <button
            className={`login-tab ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`login-tab ${activeTab === "register" ? "active" : ""}`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLoginSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username or Email</label>
            <input
              id="username"
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              placeholder="Enter your username or email"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="form-control"
            />
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log In"}
          </button>

          <div className="login-help">
            <p className="login-hint">
              <strong>Demo Accounts:</strong>
            </p>
            <ul className="demo-accounts">
              <li>
                <strong>Admin:</strong> admin / admin123
              </li>
              <li>
                <strong>Teacher A:</strong> teacher / teacher123
              </li>
              <li>
                <strong>Parent:</strong> parent / parent123
              </li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
