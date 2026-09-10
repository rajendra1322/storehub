import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Stores from "./pages/admin/Stores";

import UserStores from "./pages/user/StoreList";
import OwnerDashboard from "./pages/owner/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Account from "./pages/Account";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Admin */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="Admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute role="Admin">
            <Users />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/stores"
        element={
          <ProtectedRoute role="Admin">
            <Stores />
          </ProtectedRoute>
        }
      />

      {/* User */}
      <Route
        path="/user/stores"
        element={
          <ProtectedRoute role="User">
            <UserStores />
          </ProtectedRoute>
        }
      />

      {/* Store Owner */}
      <Route
        path="/owner/dashboard"
        element={
          <ProtectedRoute role="Store Owner">
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;