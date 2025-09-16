import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div className="p-4 border-b border-gray-700 text-gray-300 flex justify-between">
        <div className="text-2xl font-bold text-purple-800">NoteApp</div>
        <div className="mt-2 ">
          <nav className="flex justify-end">
            <ul className="flex gap-4">
              <li className="cursor-pointer">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-700 border-b-4 border-purple-700 pb-1"
                      : "hover:text-purple-700 hover:border-b-4 hover:border-purple-700 hover:pb-1 transition-all duration-300"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="hover:underline ">
                <NavLink
                  to="/add-note"
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-700 border-b-4 border-purple-700 pb-1"
                      : "hover:text-purple-700 hover:border-b-4 hover:border-purple-700 hover:pb-1 transition-all duration-300"
                  }
                >
                  Add Note
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
