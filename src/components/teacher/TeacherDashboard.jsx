import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import StudentManagement from "../student/StudentManagement";
import EnrollmentForm from "./EnrollmentForm";
import TeacherReports from "./TeacherReports";

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState("students");
  const { currentUser } = useContext(AuthContext);

  // Extract teacher's section from currentUser
  const teacherSection = currentUser?.section || "A";

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
        {activeTab === "students" && (
          <StudentManagement
            userType="teacher"
            teacherSection={teacherSection}
          />
        )}
        {activeTab === "enrollment" && (
          <EnrollmentForm teacherSection={teacherSection} />
        )}
        {activeTab === "reports" && (
          <TeacherReports teacherSection={teacherSection} />
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
