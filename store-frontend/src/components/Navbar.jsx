import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store, User, LogOut } from "lucide-react";

function Navbar({ onLogoClick }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="h-16 border-b border-gray-200 bg-white px-6">
      <div className="flex h-full items-center justify-between">
        {/* Mobile only */}
        <button
          onClick={onLogoClick}
          className="flex items-center gap-3 lg:hidden"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500">
            <Store className="text-white" size={22} />
          </div>

          <div className="text-left">
            <h1 className="font-bold text-gray-900">StoreHub</h1>
            <p className="text-xs text-gray-500">Store Rating Platform</p>
          </div>
        </button>

        {/* Desktop empty space */}
        <div className="hidden lg:block" />

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 font-bold text-teal-700 hover:bg-teal-200"
          >
            {user?.name?.charAt(0).toUpperCase()}
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-52 rounded-xl border border-gray-200 bg-white shadow-lg z-50">
              <div className="border-b px-4 py-3">
                <h3 className="font-semibold">{user?.name}</h3>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>

              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/account");
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50"
              >
                <User size={18} />
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;