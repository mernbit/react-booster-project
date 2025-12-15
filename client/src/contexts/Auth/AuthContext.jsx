import React from "react";
import { useContext } from "react";
import { createContext } from "react";
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
  };
  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/profile`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <AuthContext.Provider value={{ handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
export default AuthProvider;
