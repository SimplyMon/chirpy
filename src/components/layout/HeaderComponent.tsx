import { useState } from "react";
import { Link } from "react-router-dom";

export function HeaderComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="shrink-0 flex items-center">
            <span className="text-2xl font-bold text-blue-600">Chirpy</span>
          </div>

          <div className="hidden md:flex md:items-center space-x-6">
            <Link
              to={"/"}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Home
            </Link>
            <Link
              to={"/birds"}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Birds
            </Link>
            <Link
              to={"/about"}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              About
            </Link>
            <Link
              to={"/contact"}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Contact
            </Link>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center">
              <i className="fa fa-user-plus mr-2"></i> Sign Up
            </button>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? (
                <i className="fa fa-times fa-2x"></i>
              ) : (
                <i className="fa fa-bars fa-2x"></i>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <Link
            to={"/"}
            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            Home
          </Link>
          <Link
            to={"birds"}
            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            Birds
          </Link>
          <Link
            to={"/about"}
            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            About
          </Link>
          <Link
            to={"/contact"}
            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            Contact
          </Link>
          <button className="w-full text-left px-4 py-2 bg-blue-600 text-white rounded-md mt-2 hover:bg-blue-700 transition flex items-center">
            <i className="fa fa-user-plus mr-2"></i> Sign Up
          </button>
        </div>
      )}
    </nav>
  );
}
