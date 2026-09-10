import { useState } from "react";
import { User, Mail, MapPin, Lock, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Input from "../components/Input";
import Button from "../components/Button";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignup = async () => {
    const { name, email, address, password, confirmPassword } = form;

    if (!name || !email || !address || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await api.post("/auth/signup", {
        name,
        email,
        address,
        password,
        role: "User",
      });

      toast.success(res.data.message);

      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };
  const navigate = useNavigate();

  return (
    <div className="h-screen overflow-y-auto bg-gray-50 flex items-center justify-center p-4 ">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-1 sm:p-4 m-0 sm:m-2  shadow-xl">
        {/* <div className="flex justify-center">
          <div className="h-10 w-10 rounded-2xl bg-teal-500 flex items-center justify-center">
            <Store className="text-white" size={20} />
          </div>
        </div> */}

        <h1 className="mt-4 text-center text-3xl font-bold">
          Create User Account
        </h1>

        <p className="mb-6 text-center text-sm text-gray-500">
          Register to use StoreHub
        </p>

        <div className="space-y-1">
          <Input
            label="Full Name"
            icon={User}
            placeholder="Enter full name"
            value={form.name}
            minLength={20}
            maxLength={60}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <Input
            label="Email"
            icon={Mail}
            type="email"
            placeholder="Enter email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <Input
            label="Address"
            icon={MapPin}
            placeholder="Enter address"
            value={form.address}
            maxLength={400}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />

          <Input
            label="Password"
            icon={Lock}
            type="password"
            placeholder="Create password"
            value={form.password}
            minLength={8}
            maxLength={16}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <Input
            label="Confirm Password"
            icon={Lock}
            type="password"
            placeholder="Re-enter password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />

          <Button title="Create Account" onClick={handleSignup} />
        </div>

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link to="/" className="font-semibold text-teal-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;