import React from "react";
import Header from "../../components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Footer from "../../components/Footer";

const Frontend = () => {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </main>
  );
};

export default Frontend;
