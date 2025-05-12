import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  currentUser: null,
  userType: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [userType, setUserType] = useState(() => {
    return localStorage.getItem("userType") || null;
  });

  const login = (user, type) => {
    setCurrentUser(user);
    setUserType(type);
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("userType", type);
  };

  const logout = () => {
    setCurrentUser(null);
    setUserType(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userType");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ currentUser, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
