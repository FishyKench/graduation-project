import React from "react";

const Badge = ({ children, className }) => {
  return (
    <span className={`px-2 py-1 text-sm font-semibold rounded-lg ${className}`}>
      {children}
    </span>
  );
};

export default Badge;