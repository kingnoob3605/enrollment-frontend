import React, { createContext, useState, useEffect } from "react";

// Create context
export const ThemeContext = createContext({
  darkMode: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to light mode
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // Toggle theme function
  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Apply theme whenever darkMode changes
  useEffect(() => {
    // Save to localStorage
    localStorage.setItem("darkMode", JSON.stringify(darkMode));

    // Apply dark mode class to the document body
    if (darkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
