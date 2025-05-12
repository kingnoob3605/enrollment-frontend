/**
 * Utility to print a single student profile
 */

/**
 * Prints a student profile
 * @param {Object} student - The student object with all details
 */
const printStudentProfile = (student) => {
  if (!student) return;

  // Get current date formatted
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Create a new window with the student's profile formatted for printing
  const printWindow = window.open("", "_blank");

  printWindow.document.write(`
    <html>
      <head>
        <title>Student Profile - ${student.name}</title>
        <style>
          @media print {
            body {
              font-family: 'Arial', sans-serif;
              color: #000;
              background: #fff;
              margin: 0;
              padding: 0;
              font-size: 12pt;
            }
          
            .print-container {
              padding: 20px;
              max-width: 100%;
            }
          
            .print-header {
              text-align: center;
              border-bottom: 2px solid #2c3e50;
              padding-bottom: 15px;
              margin-bottom: 20px;
            }
          
            .print-header h1 {
              font-size: 22pt;
              color: #2c3e50;
              margin-bottom: 5px;
            }
          
            .print-header p {
              font-size: 11pt;
              color: #7f8c8d;
              margin: 5px 0;
            }
          
            .print-logo {
              text-align: center;
              margin-bottom: 15px;
            }
          
            .school-name {
              font-size: 18pt;
              font-weight: bold;
              margin-bottom: 5px;
            }
          
            .print-section {
              margin-bottom: 25px;
              page-break-inside: avoid;
            }
          
            .print-section h3 {
              font-size: 14pt;
              color: #2c3e50;
              border-bottom: 1px solid #ddd;
              padding-bottom: 5px;
              margin-bottom: 10px;
            }
          
            .print-details {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 10px;
            }
          
            .print-detail-item {
              margin-bottom: 8px;
              display: flex;
            }
          
            .print-detail-item label {
              width: 150px;
              font-weight: bold;
              color: #34495e;
            }
          
            .print-detail-item span {
              flex: 1;
            }
          
            .print-footer {
              text-align: center;
              margin-top: 30px;
              font-size: 10pt;
              color: #7f8c8d;
              border-top: 1px solid #ddd;
              padding-top: 15px;
            }
          
            .print-signatures {
              display: flex;
              justify-content: space-between;
              margin-top: 50px;
            }
          
            .signature-line {
              width: 200px;
              border-top: 1px solid #000;
              margin-top: 50px;
              text-align: center;
              padding-top: 5px;
            }
          
            button {
              display: none !important;
            }
          
            @media (max-width: 8.5in) {
              .print-details {
                grid-template-columns: 1fr;
              }
            }
            
            .no-print {
              display: none;
            }
          }
          
          /* Non-print styles (for preview) */
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f9f9f9;
            margin: 0;
            padding: 20px;
          }
          
          .print-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          
          .print-button {
            background-color: #3498db;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            margin-top: 20px;
          }
          
          .print-button:hover {
            background-color: #2980b9;
          }
          
          .print-section h3 {
            color: #2c3e50;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
          }
          
          .print-header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #2c3e50;
            padding-bottom: 20px;
          }
          
          .print-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
          }
          
          .print-detail-item {
            margin-bottom: 10px;
            display: flex;
          }
          
          .print-detail-item label {
            width: 150px;
            font-weight: bold;
            color: #34495e;
          }
          
          .print-signatures {
            display: flex;
            justify-content: space-between;
            margin-top: 70px;
          }
          
          .signature-line {
            width: 200px;
            border-top: 1px solid #000;
            margin-top: 70px;
            text-align: center;
            padding-top: 5px;
          }
        </style>
      </head>
      <body>
        <div class="print-container">
          <div class="print-header">
            <div class="print-logo">
              <!-- For a real logo, you would use an img tag -->
              <div class="school-name">Elementary School Learners Profile System</div>
            </div>
            <h1>Student Information Record</h1>
            <p>SF1 and SF8 Forms - Official Student Record</p>
            <p>Date Printed: ${currentDate}</p>
          </div>
          
          <div class="print-section">
            <h3>Personal Information (SF1)</h3>
            <div class="print-details">
              <div class="print-detail-item">
                <label>LRN:</label>
                <span>${student.lrn}</span>
              </div>
              <div class="print-detail-item">
                <label>Name:</label>
                <span>${student.name}</span>
              </div>
              <div class="print-detail-item">
                <label>Grade & Section:</label>
                <span>Grade ${student.grade}, Section ${student.section}</span>
              </div>
              <div class="print-detail-item">
                <label>Gender:</label>
                <span>${student.gender}</span>
              </div>
              <div class="print-detail-item">
                <label>Status:</label>
                <span>${student.status}</span>
              </div>
              <div class="print-detail-item">
                <label>Enrollment Date:</label>
                <span>${student.dateEnrolled}</span>
              </div>
              <div class="print-detail-item">
                <label>Teacher:</label>
                <span>${student.teacherAssigned}</span>
              </div>
            </div>
          </div>
          
          <div class="print-section">
            <h3>Health Information (SF8)</h3>
            <div class="print-details">
              <div class="print-detail-item">
                <label>Height (cm):</label>
                <span>${student.health.height}</span>
              </div>
              <div class="print-detail-item">
                <label>Weight (kg):</label>
                <span>${student.health.weight}</span>
              </div>
              <div class="print-detail-item">
                <label>BMI:</label>
                <span>${student.health.bmi}</span>
              </div>
              <div class="print-detail-item">
                <label>Nutritional Status:</label>
                <span>${student.health.nutritionalStatus}</span>
              </div>
              <div class="print-detail-item">
                <label>Vision:</label>
                <span>${student.health.vision}</span>
              </div>
              <div class="print-detail-item">
                <label>Hearing:</label>
                <span>${student.health.hearing}</span>
              </div>
              <div class="print-detail-item">
                <label>Vaccinations:</label>
                <span>${student.health.vaccinations}</span>
              </div>
              <div class="print-detail-item">
                <label>Dental Health:</label>
                <span>${student.health.dentalHealth || "Not assessed"}</span>
              </div>
            </div>
          </div>
          
          <div class="print-signatures">
            <div class="signature-block">
              <div class="signature-line">Teacher's Signature</div>
            </div>
            <div class="signature-block">
              <div class="signature-line">Parent's Signature</div>
            </div>
            <div class="signature-block">
              <div class="signature-line">Principal's Signature</div>
            </div>
          </div>
          
          <div class="print-footer">
            <p>This document is part of the official record of the Elementary School Learners Profile Management System.</p>
            <p>Document ID: ${student.lrn}-${new Date().getFullYear()}</p>
          </div>
          
          <div class="no-print">
            <button onclick="window.print()" class="print-button">Print Document</button>
          </div>
        </div>
        
        <script>
          // Auto-print when the document loads
          window.onload = function() {
            // Small delay to ensure everything is loaded
            setTimeout(function() {
              window.print();
            }, 500);
          };
        </script>
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
};

export default printStudentProfile;
