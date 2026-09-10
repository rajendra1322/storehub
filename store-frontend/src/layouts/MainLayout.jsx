import { useState } from "react";
// import { X } from "lucide-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogoClick = () => {
    // Open drawer only on mobile
    if (window.innerWidth < 1024) {
      setSidebarOpen(true);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />

          <div className="relative h-full w-[220px] bg-white shadow-xl">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute right-3 top-3 rounded-lg p-1 hover:bg-gray-100"
            >
              {/* <X size={22} /> */}
            </button>

            <Sidebar />
          </div>
        </div>
      )}

      {/* Right Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar onLogoClick={handleLogoClick} />

        <main className="flex-1 overflow-y-auto">
          <div className="w-full px-6 py-5 lg:px-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default MainLayout;