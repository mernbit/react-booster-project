import React from "react";
import Header from "../../components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";

const Frontend = () => {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </main>
  );
};

export default Frontend;
