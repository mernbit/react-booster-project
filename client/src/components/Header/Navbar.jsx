import React, { useEffect, useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="p-3 bg-primary text-white">
      <div className="flex d-container items-center justify-between">
        <div className="text-3xl">Logo</div>
        <div>
          <ul className="md:flex hidden gap-5">
            <li className="text-lg">
              <a href="">Home</a>
            </li>
            <li className="text-lg">
              <a href="">About</a>
            </li>
            <li className="text-lg">
              <a href="">Contact</a>
            </li>
          </ul>
        </div>
        <div className="hidden md:block">
          <button
            onClick={() => {
              navigate("/auth/login");
            }}
            className="btn btn-accent tracking-wider text-primary font-bold"
          >
            Login
          </button>
        </div>
        <div className={`md:hidden absolute left-0 top-15 right-0`}>
          <ul
            className={`flex flex-col overflow-hidden gap-4 bg-primary  transition-all duration-300 ${
              showMenu ? "max-h-56 p-3" : "p-0 max-h-0"
            }`}
          >
            <li className="text-lg">
              <a href="">Home</a>
            </li>
            <li className="text-lg">
              <a href="">About</a>
            </li>
            <li className="text-lg">
              <a href="">Contact</a>
            </li>
            <li className="text-lg">
              <a href="">Login</a>
            </li>
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
