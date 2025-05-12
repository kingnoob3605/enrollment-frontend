import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import StudentManagement from "../student/StudentManagement";
import EnrollmentForm from "./EnrollmentForm";
import TeacherReports from "./TeacherReports";

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const { currentUser } = useContext(AuthContext);

  // Extract teacher's section from currentUser
  const teacherSection = currentUser?.section || "A";

  // Mock today's date for display
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Mock data for quick tasks
  const tasks = [
    {
      id: 1,
      text: "Take attendance for today",
      done: false,
      due: "Today",
      urgent: true,
    },
    {
      id: 2,
      text: "Complete SF9 (Report Cards) for Q1",
      done: false,
      due: "Fri, May 16",
    },
    {
      id: 3,
      text: "Submit class activity report",
      done: true,
      due: "Yesterday",
    },
    {
      id: 4,
      text: "Update student health records",
      done: false,
      due: "Next week",
    },
  ];

  // Handle task checkbox changes
  const handleTaskCheck = (id) => {
    // In a real app, this would update the task state
    console.log(`Task ${id} status changed`);
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h3>Teacher Dashboard</h3>
        <ul className="nav-menu">
          <li
            className={activeTab === "home" ? "active" : ""}
            onClick={() => setActiveTab("home")}
          >
            Dashboard Home
          </li>
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
        {activeTab === "home" && (
          <div className="teacher-home">
            <div className="panel-header">
              <h2>Teacher Dashboard - Section {teacherSection}</h2>
            </div>

            <div className="teacher-welcome">
              <h3>
                Welcome, {currentUser?.name || `Teacher ${teacherSection}`}!
              </h3>
              <p>
                Today is {today}. You have <strong>4 pending tasks</strong> and{" "}
                <strong>1 urgent</strong> item.
              </p>
            </div>

            <div className="today-summary">
              <h3>Class Summary</h3>
              <p>
                Total Students: <strong>45</strong> | Boys: <strong>23</strong>{" "}
                | Girls: <strong>22</strong>
              </p>
              <p>
                Today's Attendance: <strong>42 Present</strong>,{" "}
                <strong>2 Absent</strong>, <strong>1 Late</strong>
              </p>

              <div className="attendance-buttons">
                <div className="attendance-btn attendance-present">
                  <span className="attendance-btn-icon">✓</span>
                  Take Attendance
                </div>
                <div className="attendance-btn attendance-absent">
                  <span className="attendance-btn-icon">✗</span>
                  Mark Absence
                </div>
                <div className="attendance-btn attendance-late">
                  <span className="attendance-btn-icon">⏱</span>
                  Record Late
                </div>
              </div>
            </div>

            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <div
                  className="action-button"
                  onClick={() => setActiveTab("students")}
                >
                  <span className="action-icon"></span>
                  <span className="action-text">Student List</span>
                </div>
                <div
                  className="action-button"
                  onClick={() => setActiveTab("enrollment")}
                >
                  <span className="action-icon"></span>
                  <span className="action-text">New Student</span>
                </div>
                <div
                  className="action-button"
                  onClick={() => setActiveTab("reports")}
                >
                  <span className="action-icon"></span>
                  <span className="action-text">Reports</span>
                </div>
                <div className="action-button">
                  <span className="action-icon"></span>
                  <span className="action-text">Grades</span>
                </div>
              </div>
            </div>

            <div className="task-list">
              <h3>Pending Tasks</h3>
              {tasks.map((task) => (
                <div className="task-item" key={task.id}>
                  <input
                    type="checkbox"
                    className="task-checkbox"
                    checked={task.done}
                    onChange={() => handleTaskCheck(task.id)}
                  />
                  <div className="task-text">{task.text}</div>
                  <div className={`task-due ${task.urgent ? "urgent" : ""}`}>
                    {task.due}
                  </div>
                </div>
              ))}
            </div>

            <div className="student-summary-cards">
              <div className="summary-card-item">
                <div className="summary-icon male-icon"></div>
                <div className="summary-details">
                  <h3>Male Students</h3>
                  <p className="summary-value">23</p>
                </div>
              </div>

              <div className="summary-card-item">
                <div className="summary-icon female-icon"></div>
                <div className="summary-details">
                  <h3>Female Students</h3>
                  <p className="summary-value">22</p>
                </div>
              </div>

              <div className="summary-card-item">
                <div className="summary-icon total-icon"></div>
                <div className="summary-details">
                  <h3>Total Students</h3>
                  <p className="summary-value">45</p>
                </div>
              </div>

              <div className="summary-card-item">
                <div className="summary-icon enrolled-icon"></div>
                <div className="summary-details">
                  <h3>Attendance</h3>
                  <p className="summary-value">93%</p>
                </div>
              </div>
            </div>
          </div>
        )}

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
