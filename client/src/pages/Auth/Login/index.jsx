import React, { useState } from "react";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { checkMail } from "../../../components/mailVerify";
import { message } from "antd";
import { Link } from "react-router-dom";
const Login = () => {
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
  const handleSubmit = (e) => {
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
    const formData = {
      email,
      password,
    };
    console.log(formData);
  };
  return (
    <div className="p-3 bg-primary flex items-center justify-center min-h-screen">
      <div className="bg-light p-3 rounded max-w-[450px] w-full">
        <h1 className="text-3xl text-center font-bold">Login</h1>
        <form className="relative" onSubmit={handleSubmit}>
          <label htmlFor="email">
            Email
            <span className="text-red-500">*</span>
          </label>
          <input
            value={state.email}
            onChange={handleChange}
            className="auth-input"
            type="email"
            name="email"
            id="email"
          />
          <label htmlFor="password">
            Password
            <span className="text-red-500">*</span>
          </label>
          <input
            value={state.password}
            onChange={handleChange}
            className="auth-input"
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-[53%] text-lg right-[2%]"
          >
            {!showPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
          </span>
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
