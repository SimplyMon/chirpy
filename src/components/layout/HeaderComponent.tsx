import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export function HeaderComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      style={{
        backgroundColor: "var(--bg-light)",
        color: "var(--text-primary)",
      }}
      className="shadow-md fixed w-full z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="shrink-0 flex items-center space-x-2">
            <span
              style={{ color: "var(--accent-bird)" }}
              className="text-2xl font-bold"
            >
              ChirpyFind
            </span>
            <img
              src="https://www.svgrepo.com/show/530309/bird.svg"
              alt="Chirpy Logo"
              className="w-10 h-10"
            />
          </div>

          <div className="hidden md:flex md:items-center space-x-6">
            {["/", "/birds", "/about"].map((path, idx) => {
              const labels = ["Home", "Birds", "About"];
              return (
                <Link
                  key={path}
                  to={path}
                  style={{
                    color: isActive(path)
                      ? "var(--accent-bird)"
                      : "var(--text-primary)",
                  }}
                  className="font-medium transition"
                  onMouseEnter={(e) => {
                    if (!isActive(path))
                      e.currentTarget.style.color = "var(--accent-leaf)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(path))
                      e.currentTarget.style.color = "var(--text-primary)";
                  }}
                >
                  {labels[idx]}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{ color: "var(--text-primary)" }}
              className="focus:outline-none"
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
        <div
          style={{ backgroundColor: "var(--bg-light)" }}
          className="md:hidden shadow-md"
        >
          {["/", "/birds", "/about"].map((path, idx) => {
            const labels = ["Home", "Birds", "About"];
            return (
              <Link
                key={path}
                to={path}
                style={{
                  color: isActive(path)
                    ? "var(--accent-bird)"
                    : "var(--text-primary)",
                  backgroundColor: isActive(path)
                    ? "var(--bg-card)"
                    : "transparent",
                }}
                className="block px-4 py-2 transition"
                onMouseEnter={(e) => {
                  if (!isActive(path))
                    e.currentTarget.style.color = "var(--accent-leaf)";
                  if (!isActive(path))
                    e.currentTarget.style.backgroundColor = "var(--bg-card)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive(path))
                    e.currentTarget.style.color = "var(--text-primary)";
                  if (!isActive(path))
                    e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {labels[idx]}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
