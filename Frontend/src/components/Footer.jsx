import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="mt-10 pt-6 border-t border-gray-700 text-xs text-gray-400 text-center">
        <p>
          &copy; {new Date().getFullYear()} NoteApp. All
          rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
