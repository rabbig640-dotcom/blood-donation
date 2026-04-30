// src/components/Navbar.jsx (Ultimate Optimized Version)
import { useState, useEffect, useRef, memo } from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import { useScrollDirection } from "../hooks/useScrollDirection";

import { FaHome } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa6";
import { GiArchiveRegister } from "react-icons/gi";
import { MdEvent } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";

const NavLinkItem = memo(({ link, onClick }) => (
  <NavLink
    to={link.path}
    onClick={onClick}
    className={({ isActive }) => `
      flex items-center gap-3 px-6 py-3 transition-all duration-200
      ${
        isActive
          ? "text-blood-600 dark:text-blood-400 bg-blood-50 dark:bg-blood-900/20 border-l-4 border-blood-600"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
      }
    `}
  >
    <span className="text-xl">{link.icon}</span>
    <span className="font-medium">{link.name}</span>
  </NavLink>
));

NavLinkItem.displayName = "NavLinkItem";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrolled } = useScrollDirection();
  const mobileMenuRef = useRef(null);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "About", path: "/about", icon: <FaBookOpen /> },
    { name: "Register", path: "/register", icon: <GiArchiveRegister /> },
    { name: "Events", path: "/events", icon: <MdEvent /> },
    { name: "Dashboard", path: "/dashboard", icon: <MdSpaceDashboard /> },
  ];

  // Close mobile menu on route change and handle click outside
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Keyboard navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <nav
      className={`
        fixed top-0 w-full z-50 transition-all duration-300
        ${
          scrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg"
            : "bg-white dark:bg-gray-800 shadow-md"
        }
      `}
      aria-label="Main navigation"
    >
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-blood-500 rounded-lg"
            aria-label="LifeShare Home"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blood-500 to-blood-700 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
              <span className="text-white font-bold text-sm">🩸</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blood-600 to-blood-800 dark:from-blood-400 dark:to-blood-200 bg-clip-text text-transparent">
              LifeShare
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `
                  relative px-4 py-2 rounded-lg transition-all duration-200
                  flex items-center gap-2 font-medium
                  ${
                    isActive
                      ? "text-blood-600 dark:text-blood-400 bg-blood-50 dark:bg-blood-900/20"
                      : "text-gray-700 dark:text-gray-300 hover:text-blood-600 dark:hover:text-blood-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <span className="text-lg">{link.icon}</span>
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-blood-600 dark:bg-blood-400 rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blood-500 transition-all duration-200 cursor-pointer"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <svg
                className="w-6 h-6 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          ref={mobileMenuRef}
          className={`
            md:hidden absolute left-0 right-0 bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out overflow-hidden
            ${
              isOpen
                ? "max-h-[calc(100vh-64px)] opacity-100"
                : "max-h-0 opacity-0 pointer-events-none"
            }
          `}
          style={{ top: "64px" }}
        >
          <div className="py-4 border-t border-gray-200 dark:border-gray-700">
            {navLinks.map((link, index) => (
              <NavLinkItem
                key={link.path}
                link={link}
                onClick={() => setIsOpen(false)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <ScrollProgressBar scrolled={scrolled} />
    </nav>
  );
}

// Separate component for scroll progress
const ScrollProgressBar = memo(({ scrolled }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolledValue = height > 0 ? (winScroll / height) * 100 : 0;
      setWidth(scrolledValue);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blood-500 to-blood-700 transition-all duration-150"
      style={{ width: `${width}%`, opacity: scrolled ? 1 : 0 }}
    />
  );
});

ScrollProgressBar.displayName = "ScrollProgressBar";
