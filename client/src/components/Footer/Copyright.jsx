import React from "react";

const Copyright = () => {
  return (
    <div className="bg-primary text-light p-2">
      <p className="text-center">
        &copy; {new Date().getFullYear()}. All Rights Reserved
      </p>
    </div>
  );
};

export default Copyright;
