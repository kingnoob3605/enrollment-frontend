import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DashboardCharts = ({ students, sections }) => {
  const [enrollmentData, setEnrollmentData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [BMIData, setBMIData] = useState([]);

  // Colors for charts
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
  ];

  useEffect(() => {
    if (students && students.length > 0) {
      // Prepare enrollment by section data
      const sectionCounts = {};
      sections.forEach((section) => {
        sectionCounts[section] = 0;
      });

      students.forEach((student) => {
        if (sectionCounts.hasOwnProperty(student.section)) {
          sectionCounts[student.section]++;
        }
      });

      const sectionData = Object.keys(sectionCounts).map((section) => ({
        name: `Section ${section}`,
        students: sectionCounts[section],
      }));

      setEnrollmentData(sectionData);

      // Prepare gender distribution data
      const maleCount = students.filter((s) => s.gender === "Male").length;
      const femaleCount = students.filter((s) => s.gender === "Female").length;

      setGenderData([
        { name: "Male", value: maleCount },
        { name: "Female", value: femaleCount },
      ]);

      // Calculate BMI categories if health data exists
      if (students[0]?.health) {
        const bmiCategories = {
          "Severely Underweight": 0,
          Underweight: 0,
          Normal: 0,
          Overweight: 0,
          Obese: 0,
        };

        students.forEach((student) => {
          if (student.health && student.health.bmi) {
            const bmi = parseFloat(student.health.bmi);

            if (bmi < 14) bmiCategories["Severely Underweight"]++;
            else if (bmi < 15) bmiCategories["Underweight"]++;
            else if (bmi < 18.5) bmiCategories["Normal"]++;
            else if (bmi < 21) bmiCategories["Overweight"]++;
            else bmiCategories["Obese"]++;
          }
        });

        setBMIData(
          Object.keys(bmiCategories).map((category) => ({
            name: category,
            value: bmiCategories[category],
          }))
        );
      }
    }
  }, [students, sections]);

  // If no data is available yet
  if (!students || students.length === 0) {
    return <div>Loading charts data...</div>;
  }

  return (
    <div className="dashboard-charts">
      <div className="charts-row">
        <div className="chart-container">
          <h4>Enrollment by Section</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="students" fill="#8884d8" name="Students" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h4>Gender Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {genderData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, "Students"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {BMIData.length > 0 && (
        <div className="chart-container">
          <h4>Nutritional Status (BMI Categories)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={BMIData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" name="Students" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Add CSS for the charts layout */}
      <style jsx="true">{`
        .dashboard-charts {
          margin-top: 2rem;
        }

        .charts-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .chart-container {
          flex: 1;
          min-width: 300px;
          background-color: var(--bg-secondary, white);
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: var(--box-shadow, 0 2px 5px rgba(0, 0, 0, 0.1));
          margin-bottom: 1.5rem;
        }

        .chart-container h4 {
          margin-bottom: 1rem;
          color: var(--text-secondary, #7f8c8d);
          text-align: center;
        }

        @media (max-width: 768px) {
          .charts-row {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardCharts;
