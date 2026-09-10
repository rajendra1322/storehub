import {
  LayoutDashboard,
  Users,
  Store,
  User,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-3 py-3 transition ${
      isActive
        ? "bg-teal-500 text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <aside className="flex h-full w-[220px] flex-col bg-white">
      {/* Top */}
      <div className="border-b border-gray-200 px-4 pt-4 pb-1">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500">
            <Store className="text-white" size={22} />
          </div>

          <div>
            <h2 className="font-bold text-gray-900">StoreHub</h2>
            <p className="text-xs text-gray-500">
              {user?.role === "Admin"
                ? "Admin Panel"
                : user?.role === "Store Owner"
                ? "Store Owner Panel"
                : "User Panel"}
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {user?.role === "Admin" && (
            <>
              <NavLink to="/admin/dashboard" className={linkClass}>
                <LayoutDashboard size={18} />
                Dashboard
              </NavLink>

              <NavLink to="/admin/users" className={linkClass}>
                <Users size={18} />
                Users
              </NavLink>

              <NavLink to="/admin/stores" className={linkClass}>
                <Store size={18} />
                Stores
              </NavLink>
            </>
          )}

          {user?.role === "Store Owner" && (
            <NavLink to="/owner/dashboard" className={linkClass}>
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>
          )}

          {user?.role === "User" && (
            <NavLink to="/user/stores" className={linkClass}>
              <Store size={18} />
              Stores
            </NavLink>
          )}

          {/* Profile for all roles */}
          <NavLink to="/account" className={linkClass}>
            <User size={18} />
            Profile
          </NavLink>
        </nav>
      </div>

      {/* Bottom Logout */}
      <div className="border-t border-gray-100 p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-red-600 transition hover:bg-red-50"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;