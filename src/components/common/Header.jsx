import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const { currentUser, userType, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="logo">
        <h1>Elementary School Learners Profile Management System</h1>
      </div>

      {currentUser && (
        <div className="user-info">
          <ThemeToggle />
          <span>
            Logged in as: {currentUser.username} ({userType})
          </span>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
