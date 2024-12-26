import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
export const Dropdown = ({
  user,
  guestText = "Guest",
  submenuPosition = "left",
  menuItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsOpen(false);
    }
  };
  const position = submenuPosition === "left" ? "left-0" : "right-0";
  return (
    <li
      className="has-dropdown relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a
        className="flex cursor-pointer items-center gap-1"
        onClick={isMobile ? toggleDropdown : undefined}
      >
        <span>{user ? user : guestText}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </a>
      <ul className={`dropdown ${isOpen ? "block" : "hidden"} ${position}`}>
        {menuItems.map((item, index) => (
          <li key={index}>
            {item.action ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  item.action();
                }}
                className="dropdown-button"
              >
                {item.text}
              </button>
            ) : (
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  isActive ? "!text-danger lg:bg-danger lg:!text-white" : ""
                }
              >
                {item.text}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </li>
  );
};
