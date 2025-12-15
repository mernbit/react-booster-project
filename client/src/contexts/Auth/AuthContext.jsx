import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import axios from "axios";
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [state, setState] = useState({});
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
      setState({
        isAuth: true,
        user: res.data.user,
        session: res.data.session,
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <AuthContext.Provider value={{ handleLogout, ...state }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
export default AuthProvider;
