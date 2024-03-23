import React from "react";

export const currentYear = new Date().getFullYear();
const Copyright = () => {
  return (
    <>
      <p className="text-center">
        &copy; {currentYear} Travely. <br /> All rights reserved.
      </p>
    </>
  );
};

export default Copyright;
