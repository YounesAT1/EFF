import React from "react";

const Copyright = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <p className="text-center">
        &copy; {currentYear} Travely. <br /> All rights reserved.
      </p>
    </>
  );
};

export default Copyright;
