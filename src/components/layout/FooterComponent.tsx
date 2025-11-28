export function FooterComponent() {
  return (
    <footer className="bg-(--bg-light shadow-inner mt-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">
          {/* Logo & Description */}
          <div className="mb-10 md:mb-0 md:w-1/3">
            <div className="flex items-center">
              <span className="text-3xl mr-3 font-bold text-(--accent-bird">
                ChirpyFind
              </span>
              <img
                src="https://www.svgrepo.com/show/530309/bird.svg"
                alt="Chirpy Logo"
                className="w-10 h-10"
              />
            </div>
            <p className="mt-3 text-(--text-secondary">
              Follow your feathered friends and explore the world of birds!
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:w-2/3">
            <div>
              <h4 className="text-(--text-primary font-semibold mb-4">
                Company
              </h4>
              <ul className="space-y-2 text-(--text-secondary">
                {["Home", "About", "Birds", "Contact"].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="hover:text-(--accent-bird transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-(--text-primary font-semibold mb-4">
                Resources
              </h4>
              <ul className="space-y-2 text-(--text-secondary">
                {["Blog", "FAQ", "Support"].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="hover:text-(--accent-bird transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-(--text-primary font-semibold mb-4">
                Contact
              </h4>
              <ul className="space-y-2 text-(--text-secondary">
                <li>Email: mon.dev005@gmail.com</li>
                <li>Phone: +1 234 567 890</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 border-t border-(--border pt-6 text-(--text-secondary text-sm text-center md:text-left">
          © {new Date().getFullYear()} Mon.Dev. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
