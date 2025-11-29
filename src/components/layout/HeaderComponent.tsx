import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export function HeaderComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      style={{
        backgroundColor: "var(--color-bg-dark)",
        color: "var(--color-text)",
      }}
      className="shadow-md fixed w-full z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="shrink-0 flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <span
                style={{ color: "var(--color-success)" }}
                className="text-2xl font-bold"
              >
                ChirpyFind
              </span>
              <img src="bird.svg" alt="Chirpy Logo" className="w-10 h-10" />
            </Link>
          </div>

          <div className="hidden md:flex md:items-center space-x-6">
            {["/", "/about", "/birds"].map((path, idx) => {
              const labels = ["Home", "About", "Birds"];
              const active = isActive(path);
              return (
                <Link
                  key={path}
                  to={path}
                  style={{
                    color: active
                      ? "var(--color-success)"
                      : "var(--color-text)",
                  }}
                  className="font-medium transition-colors"
                  onMouseEnter={(e) => {
                    if (!active)
                      e.currentTarget.style.color =
                        "var(--color-text-secondary)";
                  }}
                  onMouseLeave={(e) => {
                    if (!active)
                      e.currentTarget.style.color = "var(--color-text)";
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
              style={{ color: "var(--color-text)" }}
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
          style={{ backgroundColor: "var(--color-bg-dark)" }}
          className="md:hidden shadow-md"
        >
          {["/", "/about", "/birds"].map((path, idx) => {
            const labels = ["Home", "About", "Birds"];
            const active = isActive(path);
            return (
              <Link
                key={path}
                to={path}
                style={{
                  color: active ? "var(--color-success)" : "var(--color-text)",
                  backgroundColor: active
                    ? "var(--color-card-dark)"
                    : "transparent",
                }}
                className="block px-4 py-2 transition-colors"
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = "var(--color-text-secondary)";
                    e.currentTarget.style.backgroundColor =
                      "var(--color-card-dark)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = "var(--color-text)";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
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
