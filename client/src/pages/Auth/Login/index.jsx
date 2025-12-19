import React, { useState } from "react";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { checkMail } from "../../../components/mailVerify";
import { message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/Auth/AuthContext";
const Login = () => {
  const navigate = useNavigate();
  const { fetchUser } = useAuthContext();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let { email, password } = state;
    email = email.trim();
    if (!email) {
      return message.error("Email is required");
    }
    if (!checkMail(email)) {
      return message.error("Invalid email");
    }
    if (!password) {
      return message.error("Password is required");
    }
    email = email.toLowerCase();
    email = email.trim();
    const formData = {
      email,
      password,
    };
    console.log(formData);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
        formData
      );
      console.log(res.data.status);
      if (res.data.status === "success") {
        localStorage.setItem("authToken", res.data.token);
        message.success("User login successful");
        fetchUser();
        navigate("/");
      }
    } catch (error) {
      message.error("User login failed");
    }
  };
  return (
    <div className="p-3 bg-primary flex items-center justify-center min-h-screen">
      <div className="bg-light p-3 rounded max-w-[450px] w-full">
        <h1 className="text-3xl text-center font-bold">Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            Email
            <span className="text-red-500">*</span>
          </label>
          <input
            value={state.email}
            onChange={handleChange}
            className="auth-input"
            placeholder="Email"
            type="email"
            name="email"
            id="email"
          />
          <div className="relative">
            <label htmlFor="password">
              Password
              <span className="text-red-500">*</span>
            </label>
            <input
              value={state.password}
              onChange={handleChange}
              className="auth-input"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-[50%] text-lg right-[2%]"
            >
              {!showPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
          </div>
          <Link
            to="/auth/register"
            className="text-blue-500 hover:text-blue-600"
          >
            Don't have an account?
          </Link>
          <button className="btn btn-accent w-full">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
