import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-gray-800 p-6">
      <div className="text-[6rem] animate-bounce mb-4">🐵</div>

      <h1 className="text-[8rem] font-extrabold mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-2">Oops! Page not found</h2>
      <p className="text-lg mb-6 text-center max-w-md">
        Looks like this page is taking a nap 😴. Maybe our monkey friend can
        find it?
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-gray-800 text-white font-bold rounded-full shadow-lg hover:bg-gray-700 transform hover:scale-105 transition-all duration-300"
      >
        Go back home 🏠
      </Link>
    </div>
  );
}
