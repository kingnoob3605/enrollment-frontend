import React, { useState, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { AuthProvider } from "./contexts/AuthContext"; // Add this import
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Login from "./components/auth/Login";
import AdminDashboard from "./components/admin/AdminDashboard";
import TeacherDashboard from "./components/teacher/TeacherDashboard";
import ParentDashboard from "./components/parent/ParentDashboard";
import "./assets/styles/index.css";
import "./assets/styles/login.css";
import "./assets/styles/dashboard.css";
import "./assets/styles/forms.css";
import "./assets/styles/tables.css";
import "./assets/styles/responsive.css";
import "./assets/styles/utilities.css";
import "./assets/styles/theme.css";
import "./assets/styles/reports.css";
import "./assets/styles/profile-tabs.css";
import "./assets/styles/print.css";

function App() {
  // Show loading indicator for initial load
  const [initialLoading, setInitialLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    // Short timeout to ensure the app has time to check localStorage
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Show loading indicator while checking localStorage
  if (initialLoading) {
    return (
      <div className="loading-overlay">
        <div>
          <div className="loader"></div>
          <p className="loading-text">Loading...</p>
        </div>
      </div>
    );
  }

  // Wrap our app with ThemeProvider and AuthProvider
  return (
    <ThemeProvider>
      <div className="app">
        <AuthProvider>
          {/* Use the AuthContext to access user data */}
          <AuthContext.Consumer>
            {({ currentUser, userType }) => (
              <>
                {!currentUser ? (
                  <Login />
                ) : (
                  <>
                    <Header />
                    <main className="main-content">
                      {userType === "admin" && <AdminDashboard />}
                      {userType === "teacher" && <TeacherDashboard />}
                      {userType === "parent" && <ParentDashboard />}
                    </main>
                    <Footer />
                  </>
                )}
              </>
            )}
          </AuthContext.Consumer>
        </AuthProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
