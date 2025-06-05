import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Code, User, LogOut } from "lucide-react";

import { useAuthStore } from "../store/useAuthStore";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const { authUser } = useAuthStore();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: "Problems", path: "/problems" },
    { name: "Learn", path: "/learn" },
    { name: "Contest", path: "/contest" },
    { name: "Contact Us", path: "/contact" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  const adminNavLinks = [
    { name: "Problems", path: "/problems" },
    { name: "Learn", path: "/learn" },
    { name: "Contest", path: "/contest" },
    { name: "Contact Us", path: "/contact" },
    { name: "Add problem", path: "/add-problem" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 backdrop-blur-sm ${
        scrolled ? "opacity-100 shadow-lg" : " opacity-0 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center text-indigo-500 hover:text-indigo-400 transition-colors"
            >
              <Code className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">Love Leetcode</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "text-indigo-400 bg-gray-800"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {authUser?.data?.role === "ADMIN" && (
                <Link
                  key={"Add problem"}
                  to="/add-problem"
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    location.pathname === "/add-problem"
                      ? "text-indigo-400 bg-gray-800"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  Add Problem
                </Link>
              )}

              <Link
                to="/dashboard"
                className="rounded-full text-gray-300 hover:text-white focus:outline-none"
              >
                {authUser?.data?.image ?
                <img
                  src={authUser?.data?.image}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                :

                <User size={20} />
                }
                
              </Link>
              {authUser && (
                <LogoutButton className="">
                  <LogOut className="w-4 h-4 text-white" />
                </LogoutButton>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 backdrop-blur-sm sm:px-3 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === link.path
                  ? "text-indigo-400 bg-gray-800"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center justify-between px-3 py-2">
            <Link
              to="/profile"
              className="p-2 rounded-full text-gray-300 hover:text-white focus:outline-none"
              onClick={() => setIsOpen(false)}
            >
              <User size={20} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
