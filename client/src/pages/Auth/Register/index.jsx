import React, { useState } from "react";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { checkMail } from "../../../components/mailVerify";
import { message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    let { firstName, lastName, email, password, confirmPassword } = state;
    if (!firstName) {
      return message.error("First Name is required");
    }
    if (!lastName) {
      return message.error("Last Name is required");
    }
    if (!email) {
      return message.error("Email is required");
    }
    if (!checkMail(email)) {
      return message.error("Invalid email");
    }
    if (!password) {
      return message.error("Password is required");
    }
    if (password.length < 8) {
      return message.error("Password must be at least 8 characters");
    }
    if (password !== state.confirmPassword) {
      return message.error("Passwords do not match");
    }
    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.trim();
    email = email.toLowerCase();

    const formData = {
      firstName,
      lastName,
      email,
      password,
    };
    console.log("formData", formData);
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/register`,
      formData
    );
    console.log(res.data.status);
    if (res.data.status === "success") {
      message.success("User registered successfully");
      navigate("/auth/login");
    } else {
      message.error("User registration failed");
    }
  };
  return (
    <div className="p-3 bg-primary flex items-center justify-center min-h-screen">
      <div className="bg-light p-3 rounded max-w-[450px] w-full">
        <h1 className="text-3xl text-center font-bold">Register</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">
            First Name
            <span className="text-red-500">*</span>
          </label>
          <input
            value={state.firstName}
            onChange={handleChange}
            className="auth-input"
            type="text"
            placeholder="First Name"
            name="firstName"
            id="firstName"
          />
          <label htmlFor="lastName">
            Last Name
            <span className="text-red-500">*</span>
          </label>
          <input
            value={state.lastName}
            onChange={handleChange}
            className="auth-input"
            type="text"
            placeholder="Last Name"
            name="lastName"
            id="lastName"
          />
          <label htmlFor="email">
            Email
            <span className="text-red-500">*</span>
          </label>
          <input
            value={state.email}
            onChange={handleChange}
            className="auth-input"
            type="email"
            placeholder="Email"
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
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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
          <div className="relative">
            <label htmlFor="confirmPassword">
              Confirm Password
              <span className="text-red-500">*</span>
            </label>
            <input
              value={state.confirmPassword}
              onChange={handleChange}
              className="auth-input"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirmPassword"
              id="confirmPassword"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-[50%] text-lg right-[2%]"
            >
              {!showPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
          </div>
          <Link to="/auth/login" className="text-blue-500 hover:text-blue-600">
            Already have an account?
          </Link>
          <button className="btn btn-accent w-full">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
