import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import { toast } from "sonner";

function Account() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePassword = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      return toast.error("New passwords do not match");
    }

    try {
      const res = await api.put("/auth/change-password", {
        userId: user.id,
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      toast.success(res.data.message);

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Password update failed"
      );
    }
  };

  return (
    <MainLayout>
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Account</h1>
          <p className="text-gray-500">
            Manage your profile and password
          </p>
        </div>

        {/* Profile Card */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-100 text-3xl font-bold text-teal-700">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                {user.name}
              </h2>

              <p className="text-gray-500">{user.email}</p>

              <span className="mt-2 inline-block rounded-full bg-teal-100 px-3 py-1 text-sm text-teal-700">
                {user.role}
              </span>
            </div>
          </div>
        </div>

        {/* Password Card */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold">
            Change Password
          </h2>

          <form onSubmit={handlePassword} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={form.currentPassword}
                onChange={handleChange}
                required
                className="w-full rounded-lg border px-4 py-2 outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                required
                className="w-full rounded-lg border px-4 py-2 outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full rounded-lg border px-4 py-2 outline-none focus:border-teal-500"
              />
            </div>

            <button className="rounded-lg bg-teal-600 px-5 py-2 text-white hover:bg-teal-700">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}

export default Account;