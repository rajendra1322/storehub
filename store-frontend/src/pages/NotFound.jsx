import { Link } from "react-router-dom";
import { AlertCircle, Home } from "lucide-react";

function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-teal-100">
          <AlertCircle size={40} className="text-teal-600" />
        </div>

        <h1 className="text-5xl font-bold text-gray-800">404</h1>
        <h2 className="mt-2 text-xl font-semibold">Page Not Found</h2>

        <p className="mt-2 text-gray-500">
          The page you're looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-teal-600 px-5 py-3 font-medium text-white transition hover:bg-teal-700"
        >
          <Home size={18} />
          Back to Login
        </Link>
      </div>
    </div>
  );
}

export default NotFound;