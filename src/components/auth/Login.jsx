import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [registrationData, setRegistrationData] = useState({
    username: "",
    fullName: "",
    email: "",
    role: "parent", // Default to parent role
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [error, setError] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCredentials({
      ...credentials,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRegistrationInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegistrationData({
      ...registrationData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear any previous registration error when user makes changes
    if (registrationError) {
      setRegistrationError("");
    }
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

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    setRegistrationError("");

    // Form validation
    if (!registrationData.username.trim()) {
      setRegistrationError("Username is required");
      return;
    }

    if (!registrationData.fullName.trim()) {
      setRegistrationError("Full name is required");
      return;
    }

    if (!registrationData.email.trim()) {
      setRegistrationError("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registrationData.email)) {
      setRegistrationError("Please enter a valid email address");
      return;
    }

    if (registrationData.password.length < 6) {
      setRegistrationError("Password must be at least 6 characters long");
      return;
    }

    if (registrationData.password !== registrationData.confirmPassword) {
      setRegistrationError("Passwords do not match");
      return;
    }

    if (!registrationData.agreeToTerms) {
      setRegistrationError("You must agree to the terms and conditions");
      return;
    }

    setIsLoading(true);

    // Mock registration logic (would connect to backend in a real app)
    setTimeout(() => {
      setIsLoading(false);
      setRegistrationSuccess(true);

      // Clear the form
      setRegistrationData({
        username: "",
        fullName: "",
        email: "",
        role: "parent",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
      });

      // Auto-switch to login tab after successful registration
      setTimeout(() => {
        setActiveTab("login");
        setRegistrationSuccess(false);
        // Pre-fill the login form with the registered username for convenience
        setCredentials({
          ...credentials,
          username: registrationData.username,
        });
      }, 3000);
    }, 1500);
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

        {activeTab === "login" && (
          <>
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

              <div className="form-options">
                <div className="remember-me">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={credentials.rememberMe}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="rememberMe">Remember me</label>
                </div>
                <button type="button" className="forgot-password">
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="login-button"
                disabled={isLoading}
              >
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
          </>
        )}

        {activeTab === "register" && (
          <>
            {registrationError && (
              <div className="error-message">{registrationError}</div>
            )}
            {registrationSuccess && (
              <div className="success-message">
                Registration successful! You'll be redirected to the login page
                shortly.
              </div>
            )}

            <form onSubmit={handleRegistrationSubmit} className="register-form">
              <div className="form-group">
                <label htmlFor="reg-username">Username*</label>
                <input
                  id="reg-username"
                  type="text"
                  name="username"
                  value={registrationData.username}
                  onChange={handleRegistrationInputChange}
                  placeholder="Choose a username"
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="full-name">Full Name*</label>
                <input
                  id="full-name"
                  type="text"
                  name="fullName"
                  value={registrationData.fullName}
                  onChange={handleRegistrationInputChange}
                  placeholder="Enter your full name"
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="reg-email">Email Address*</label>
                <input
                  id="reg-email"
                  type="email"
                  name="email"
                  value={registrationData.email}
                  onChange={handleRegistrationInputChange}
                  placeholder="Enter your email address"
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Role*</label>
                <select
                  id="role"
                  name="role"
                  value={registrationData.role}
                  onChange={handleRegistrationInputChange}
                  className="form-control"
                  required
                >
                  <option value="parent">Parent/Guardian</option>
                  <option value="teacher">Teacher</option>
                </select>
                <small>
                  Admin accounts can only be created by existing administrators.
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="reg-password">Password*</label>
                <input
                  id="reg-password"
                  type="password"
                  name="password"
                  value={registrationData.password}
                  onChange={handleRegistrationInputChange}
                  placeholder="Create a password (minimum 6 characters)"
                  className="form-control"
                  required
                  minLength="6"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password*</label>
                <input
                  id="confirm-password"
                  type="password"
                  name="confirmPassword"
                  value={registrationData.confirmPassword}
                  onChange={handleRegistrationInputChange}
                  placeholder="Confirm your password"
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group checkbox-group terms-checkbox">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={registrationData.agreeToTerms}
                  onChange={handleRegistrationInputChange}
                  required
                />
                <label htmlFor="agreeToTerms">
                  I agree to the <a href="#terms">Terms and Conditions</a> and{" "}
                  <a href="#privacy">Privacy Policy</a>
                </label>
              </div>

              <button
                type="submit"
                className="register-button"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register"}
              </button>

              <div className="register-footer">
                Already have an account?
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className="switch-tab"
                >
                  Log in here
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
