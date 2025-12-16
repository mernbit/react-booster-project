import React, { useEffect, useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/Auth/AuthContext";
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { isAuth, handleLogout } = useAuthContext();
  return (
    <div className="p-3 bg-primary text-white">
      <div className="flex d-container items-center justify-between">
        <div className="text-3xl">Logo</div>
        <div>
          <ul className="md:flex hidden gap-5">
            <li className="text-lg">
              <Link to="">Home</Link>
            </li>
            <li className="text-lg">
              <Link to="">About</Link>
            </li>
            <li className="text-lg">
              <Link to="">Contact</Link>
            </li>
            {isAuth && (
              <li className="text-lg">
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )}
          </ul>
        </div>
        <div className="hidden md:block">
          {isAuth ? (
            <button
              onClick={handleLogout}
              className="btn btn-danger tracking-wider text-light font-bold"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/auth/login");
              }}
              className="btn btn-accent tracking-wider text-primary font-bold"
            >
              Login
            </button>
          )}
        </div>
        <div className={`md:hidden absolute left-0 top-15 right-0`}>
          <ul
            className={`flex flex-col overflow-hidden gap-4 bg-primary  transition-all duration-300 ${
              showMenu ? "max-h-56 p-3" : "p-0 max-h-0"
            }`}
          >
            <li className="text-lg">
              <Link to="">Home</Link>
            </li>
            <li className="text-lg">
              <Link to="">About</Link>
            </li>
            <li className="text-lg">
              <Link to="">Contact</Link>
            </li>
            {isAuth ? (
              <li className="text-lg">
                <Link to="/dashboard">Dashboard</Link>
              </li>
            ) : (
              <li className="text-lg">
                <Link to="/auth/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
        <div className="text-2xl md:hidden">
          <div className="px-5 py-2 rounded">
            <MenuOutlined
              className={`transition-all duration-300 ${
                showMenu && "rotate-90"
              }`}
              onClick={() => setShowMenu(!showMenu)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
