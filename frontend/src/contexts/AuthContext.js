import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    // Mock login - will be replaced with real JWT authentication
    if (email && password) {
      const mockUser = {
        id: "1",
        email: email,
        name: email.split("@")[0]
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, error: "Invalid credentials" };
  };

  const signup = async (email, password, name) => {
    // Mock signup - will be replaced with real registration
    if (email && password && name) {
      const mockUser = {
        id: "1",
        email: email,
        name: name
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, error: "Invalid details" };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      login,
      signup,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};