import React from "react";

const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <button onClick={() => onOpenChange(false)} className="absolute top-2 right-2">
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

const DialogContent = ({ children }) => {
  return <div>{children}</div>;
};

export { Dialog, DialogContent };
