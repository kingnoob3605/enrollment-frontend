import React, { useState } from "react";
import StudentManagement from "../student/StudentManagement";
import EnrollmentForm from "./EnrollmentForm";
import Reports from "../admin/Reports";

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState("students");

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h3>Teacher Dashboard</h3>
        <ul className="nav-menu">
          <li
            className={activeTab === "students" ? "active" : ""}
            onClick={() => setActiveTab("students")}
          >
            Student Management
          </li>
          <li
            className={activeTab === "enrollment" ? "active" : ""}
            onClick={() => setActiveTab("enrollment")}
          >
            Enrollment
          </li>
          <li
            className={activeTab === "reports" ? "active" : ""}
            onClick={() => setActiveTab("reports")}
          >
            Reports
          </li>
        </ul>
      </div>

      <div className="content">
        {activeTab === "students" && <StudentManagement userType="teacher" />}
        {activeTab === "enrollment" && <EnrollmentForm />}
        {activeTab === "reports" && <Reports />}
      </div>
    </div>
  );
};

export default TeacherDashboard;
