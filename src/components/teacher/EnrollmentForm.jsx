// src/components/teacher/EnrollmentForm.jsx - Mock form for adding students
import React, { useState } from "react";

const EnrollmentForm = ({
  onClose,
  onSave,
  defaultGrade = "1",
  sections = ["A", "B", "C", "D", "E"],
}) => {
  const [formData, setFormData] = useState({
    // SF1 Data
    lrn: "",
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    grade: defaultGrade,
    section: sections[0],
    birthdate: "",
    gender: "Male",
    address: "",
    parentName: "",
    parentContact: "",
    parentEmail: "",

    // SF8 Data
    height: "",
    weight: "",
    vision: "Normal",
    hearing: "Normal",
    vaccinations: "Complete",
  });

  const calculateBMI = () => {
    if (formData.height && formData.weight) {
      // Convert height from cm to m
      const heightInMeters = formData.height / 100;
      // Calculate BMI: weight (kg) / (height (m) * height (m))
      return (formData.weight / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.lrn ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.birthdate
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Create full name from form fields
    const fullName = `${formData.firstName} ${
      formData.middleName ? formData.middleName + " " : ""
    }${formData.lastName}${formData.suffix ? " " + formData.suffix : ""}`;

    // Create student object to save
    const studentData = {
      name: fullName,
      lrn: formData.lrn,
      grade: formData.grade,
      section: formData.section,
      birthdate: formData.birthdate,
      gender: formData.gender,
      address: formData.address,
      parent_name: formData.parentName,
      parent_contact: formData.parentContact,
      parent_email: formData.parentEmail,
      health: {
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        bmi: calculateBMI(),
        vision: formData.vision,
        hearing: formData.hearing,
        vaccinations: formData.vaccinations,
      },
      // Added fields for direct display
      height: parseFloat(formData.height),
      weight: parseFloat(formData.weight),
      bmi: calculateBMI(),
      vision: formData.vision,
      hearing: formData.hearing,
      vaccinations: formData.vaccinations,
    };

    // Call the onSave function passed from parent component
    if (onSave) {
      onSave(studentData);
    }
  };

  return (
    <div className="enrollment-form">
      <div className="form-header">
        <h2>Grade 1 Student Enrollment Form</h2>
        {onClose && (
          <button onClick={onClose} className="close-button">
            Close
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-sections">
          <div className="form-section">
            <h3>Personal Information (SF1)</h3>

            <div className="form-group">
              <label>LRN (Learner Reference Number)*:</label>
              <input
                type="text"
                name="lrn"
                value={formData.lrn}
                onChange={handleChange}
                required
                pattern="[0-9]{12}"
                title="LRN must be 12 digits"
              />
              <small>LRN must be 12 digits</small>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>First Name*:</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Middle Name:</label>
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Last Name*:</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Suffix:</label>
                <input
                  type="text"
                  name="suffix"
                  value={formData.suffix}
                  onChange={handleChange}
                  placeholder="Jr., III, etc."
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Grade Level:</label>
                <input
                  type="text"
                  value="Grade 1"
                  disabled
                  className="form-control"
                />
                <input type="hidden" name="grade" value={formData.grade} />
              </div>

              <div className="form-group">
                <label>Section*:</label>
                <select
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  required
                >
                  {sections.map((section) => (
                    <option key={section} value={section}>
                      Section {section}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Birth Date*:</label>
                <input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Gender*:</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Complete Address*:</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label>Parent/Guardian Name*:</label>
              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Parent/Guardian Contact*:</label>
                <input
                  type="tel"
                  name="parentContact"
                  value={formData.parentContact}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Parent/Guardian Email:</label>
                <input
                  type="email"
                  name="parentEmail"
                  value={formData.parentEmail}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Health Information (SF8)</h3>

            <div className="form-row">
              <div className="form-group">
                <label>Height (cm)*:</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  required
                  step="0.1"
                  min="50"
                  max="200"
                />
              </div>

              <div className="form-group">
                <label>Weight (kg)*:</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                  step="0.1"
                  min="10"
                  max="100"
                />
              </div>
            </div>

            <div className="form-group">
              <label>BMI:</label>
              <input type="text" value={calculateBMI()} readOnly disabled />
              <small>Automatically calculated</small>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Vision:</label>
                <select
                  name="vision"
                  value={formData.vision}
                  onChange={handleChange}
                >
                  <option value="Normal">Normal</option>
                  <option value="Needs Correction">Needs Correction</option>
                </select>
              </div>

              <div className="form-group">
                <label>Hearing:</label>
                <select
                  name="hearing"
                  value={formData.hearing}
                  onChange={handleChange}
                >
                  <option value="Normal">Normal</option>
                  <option value="Needs Assistance">Needs Assistance</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Vaccinations:</label>
              <select
                name="vaccinations"
                value={formData.vaccinations}
                onChange={handleChange}
              >
                <option value="Complete">Complete</option>
                <option value="Incomplete">Incomplete</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Enroll Student
          </button>
          {onClose && (
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EnrollmentForm;
