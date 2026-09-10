import { useState,useEffect } from "react";
import { Mail, Lock, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Input from "../components/Input";
import Button from "../components/Button";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Please enter email and password");
            return;
        }

        try {
            const res = await api.post("/auth/login", {
                email,
                password,
            });

            const { token, user } = res.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            toast.success("Login Successful");

            if (user.role === "Admin") {
                navigate("/admin/dashboard");
            } else if (user.role === "Store Owner") {
                navigate("/owner/dashboard");
            } else {
                navigate("/user/stores");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        }
    };
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        if (token && user) {
            if (user.role === "Admin") {
                navigate("/admin/dashboard");
            } else if (user.role === "Store Owner") {
                navigate("/owner/dashboard");
            } else {
                navigate("/user/stores");
            }
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-5">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
                <div className="flex justify-center">
                    <div className="h-16 w-16 rounded-2xl bg-teal-500 flex items-center justify-center">
                        <Store className="text-white" size={30} />
                    </div>
                </div>

                <h1 className="mt-4 text-center text-3xl font-bold text-gray-900">
                    StoreHub
                </h1>

                <p className="mb-6 text-center text-sm text-gray-500">
                    Sign in to continue
                </p>

                <div className="space-y-4">
                    <Input
                        label="Email"
                        icon={Mail}
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        label="Password"
                        icon={Lock}
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button title="Login" onClick={handleLogin} />
                </div>

                <p className="mt-6 text-center text-sm">
                    Don't have an account?{" "}
                    <Link to="/signup" className="font-semibold text-teal-600">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;