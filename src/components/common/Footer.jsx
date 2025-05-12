import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          &copy; {currentYear} Elementary School Learners Profile Management
          System
        </p>
        <p>
          Developed by: Jovin Dela Torre, Jhon Mark Noyad, Brendo Dellatan Jr.,
          Adham Shafiqui Michael, Angelo Depamaylo
        </p>
      </div>
    </footer>
  );
};

export default Footer;
