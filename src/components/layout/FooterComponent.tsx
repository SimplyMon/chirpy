export function FooterComponent() {
  return (
    <footer className="bg-white shadow-inner mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="md:flex md:justify-between md:items-start gap-12">
          <div className="mb-8 md:mb-0 md:w-1/3">
            <span className="text-3xl font-bold text-blue-600">Chirpy</span>
            <p className="mt-3 text-gray-600">
              Follow your feathered friends and explore the world of birds!
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:w-2/3">
            <div>
              <h4 className="text-gray-800 font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition">
                    Birds
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-800 font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-800 font-semibold mb-4">Follow Us</h4>
              <ul className="flex space-x-4 text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition">
                    <i className="fab fa-facebook fa-lg"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition">
                    <i className="fab fa-twitter fa-lg"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition">
                    <i className="fab fa-instagram fa-lg"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition">
                    <i className="fab fa-github fa-lg"></i>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-800 font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Email: info@chirpy.com</li>
                <li>Phone: +1 234 567 890</li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition">
                    Location
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-6 text-gray-500 text-sm text-center md:text-left">
          © {new Date().getFullYear()} Mon.Dev. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
