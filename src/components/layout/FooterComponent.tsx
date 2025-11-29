export function FooterComponent() {
  return (
    <footer
      style={{ backgroundColor: "var(--color-bg-dark)" }}
      className="shadow-inner mt-12"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">
          <div className="mb-10 md:mb-0 md:w-1/3">
            <div className="flex items-center">
              <span
                style={{ color: "var(--color-success)" }}
                className="text-3xl mr-3 font-bold"
              >
                ChirpyFind
              </span>
              <img src="bird.svg" alt="Chirpy Logo" className="w-10 h-10" />
            </div>
            <p
              style={{ color: "var(--color-text-secondary)" }}
              className="mt-3"
            >
              Follow your feathered friends and explore the world of birds!
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:w-2/3">
            <div>
              <h4
                style={{ color: "var(--color-text)" }}
                className="font-semibold mb-4"
              >
                Company
              </h4>
              <ul
                style={{ color: "var(--color-text-secondary)" }}
                className="space-y-2"
              >
                {["Home", "About", "Birds", "Contact"].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{ color: "var(--color-text-secondary)" }}
                      className="hover:text-(--color-success) transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4
                style={{ color: "var(--color-text)" }}
                className="font-semibold mb-4"
              >
                Resources
              </h4>
              <ul
                style={{ color: "var(--color-text-secondary)" }}
                className="space-y-2"
              >
                {["Blog", "FAQ", "Support"].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{ color: "var(--color-text-secondary)" }}
                      className="hover:text-(--color-success) transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4
                style={{ color: "var(--color-text)" }}
                className="font-semibold mb-4"
              >
                Contact
              </h4>
              <ul
                style={{ color: "var(--color-text-secondary)" }}
                className="space-y-2"
              >
                <li>Email: mon.dev005@gmail.com</li>
                <li>Phone: 09927199525</li>
              </ul>
            </div>
          </div>
        </div>

        <div
          style={{
            color: "var(--color-text-secondary)",
            borderColor: "var(--color-border-dark)",
          }}
          className="mt-12 border-t pt-6 text-sm text-center"
        >
          © {new Date().getFullYear()} Mon.Dev. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
