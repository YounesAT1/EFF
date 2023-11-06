import React from "react";

const Copyright = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <p>&copy; {currentYear} Travely. All rights reserved.</p>
    </>
  );
};

export default Copyright;
