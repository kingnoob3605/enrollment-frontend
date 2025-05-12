import React, { useState } from "react";
import StudentProfile from "../student/StudentProfile";

const ParentDashboard = () => {
  // Mock data - in a real app, this would come from an API
  const [children, setChildren] = useState([
    { id: 1, name: "John Doe", grade: "3", section: "A" },
    { id: 2, name: "Jane Doe", grade: "5", section: "B" },
  ]);

  const [selectedChild, setSelectedChild] = useState(null);

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h3>Parent Dashboard</h3>
        <div className="child-list">
          <h4>My Children</h4>
          <ul className="nav-menu">
            {children.map((child) => (
              <li
                key={child.id}
                className={selectedChild === child.id ? "active" : ""}
                onClick={() => setSelectedChild(child.id)}
              >
                {child.name} - Grade {child.grade}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="content">
        {selectedChild ? (
          <StudentProfile
            student={children.find((child) => child.id === selectedChild)}
            viewOnly={true}
          />
        ) : (
          <div className="select-prompt">
            <h2>Welcome to Parent Dashboard</h2>
            <p>
              Select a child from the sidebar to view their profile and academic
              information.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentDashboard;
