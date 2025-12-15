import React from "react";
import { Route, Routes } from "react-router-dom";
import Frontend from "./Frontend";
import Auth from "./Auth";
import PrivateRouting from "../components/PrivateRouting";

const Index = () => {
  return (
    <Routes>
      <Route path="/*" element={<Frontend />} />
      <Route path="/auth/*" element={<PrivateRouting Component={Auth} />} />
    </Routes>
  );
};

export default Index;
