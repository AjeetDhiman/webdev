import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Dropdown } from "./Functions";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/Auth/authSlicer";
import { ThemeMode } from "./ThemeMode";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const nickname = useSelector((state) => state.auth.nickname);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const loggedInDropdownItems = [
    { text: "Profile", link: "/profile" },
    { text: "Logout", action: handleLogout },
  ];

  const notLoggedInDropdownItems = [
    { text: "Login", link: "/login" },
    { text: "Sign Up", link: "/signup" },
  ];

  return (
    <header className="border-b-2 border-b-primary bg-[#E8F3F3]">
      <nav className="nav">
        <div className="flex items-center justify-between p-3 lg:hidden">
          <NavLink to="/">
            <p className="text-[1.063rem] font-semibold">
              <span className="me-[2px] bg-primary px-[4px] text-[1.688rem] text-white">
                Note
              </span>
              Book
            </p>
          </NavLink>
          <button
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            className="m-0 p-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`h-8 w-8 ${isMenuOpen ? "hidden" : "block"}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`h-8 w-8 ${isMenuOpen ? "block" : "hidden"}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div
          className={`absolute left-0 top-0 mx-auto h-full w-full bg-white p-4 shadow-md transition-all duration-300 ease-in-out sm:w-5/12 lg:static lg:flex lg:h-auto lg:w-auto lg:translate-x-0 lg:items-center lg:justify-between lg:bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none ${isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-[-100%] opacity-0"}`}
        >
          <button
            type="button"
            onClick={() => {
              setIsMenuOpen(false);
            }}
            className="absolute right-2 top-1 block text-danger lg:relative lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-10 w-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>

          <ul className="nav__links mt-5 block items-center ps-3 lg:mt-0 lg:flex lg:ps-0">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active-class" : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "active-class" : "")}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blogs"
                className={({ isActive }) => (isActive ? "active-class" : "")}
              >
                Blogs
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/faq"
                className={({ isActive }) => (isActive ? "active-class" : "")}
              >
                FAQ
              </NavLink>
            </li>
          </ul>

          <NavLink to="/" className="hidden lg:block">
            <p className="text-[1.063rem] font-semibold">
              <span className="me-[2px] bg-primary px-[4px] text-[1.688rem] text-white">
                Note
              </span>
              Book
            </p>
          </NavLink>
          <ul className="nav__links block items-center ps-3 lg:mt-0 lg:flex lg:ps-0">
            <li className="hidden lg:block">
              <button type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? "active-class" : "")}
              >
                Contact
              </NavLink>
            </li>
            <Dropdown
              user={nickname}
              menuItems={
                nickname ? loggedInDropdownItems : notLoggedInDropdownItems
              }
              submenuPosition="right"
            />
            <li>
              <ThemeMode />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
