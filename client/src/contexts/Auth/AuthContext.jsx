import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import axios from "axios";
import { Loading3QuartersOutlined } from "@ant-design/icons";
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [state, setState] = useState({ isAuth: false, user: {}, session: {} });
  const [isAppLoading, setIsAppLoading] = useState(true);
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setState({ isAuth: false, user: {}, session: {} });
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
      console.log("Not Authenticated");
    } finally {
      setIsAppLoading(false);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      fetchUser();
    } else {
      setIsAppLoading(false);
    }
  }, []);
  console.log(state);
  if (isAppLoading) {
    return (
      <div className="bg-primary min-h-screen flex items-center justify-center">
        <div className="text-5xl flex flex-col items-center">
          <h1 className="text-light m-5">Loading...</h1>
          <Loading3QuartersOutlined className="text-light animate-spin" />
        </div>
      </div>
    );
  }
  return (
    <AuthContext.Provider value={{ handleLogout, fetchUser, ...state }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
export default AuthProvider;
