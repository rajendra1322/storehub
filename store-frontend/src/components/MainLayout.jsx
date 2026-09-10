import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Navbar onMenu={() => setOpen(true)} />

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {open && (
          <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">
            <div className="w-64 h-full bg-white">
              <Sidebar />
            </div>

            <div
              className="absolute inset-0 -z-10"
              onClick={() => setOpen(false)}
            />
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;