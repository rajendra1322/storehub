import { useEffect, useState } from "react";
import api from "../../services/api";
import MainLayout from "../../layouts/MainLayout";
import { Search, CirclePlus } from "lucide-react";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import { User, Mail, MapPin, Lock } from "lucide-react";
import { toast } from "sonner";



function Users() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    const filtered = users.filter((user) =>
        `${user.name} ${user.email} ${user.address} ${user.role}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );
    const [open, setOpen] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        password: "",
        role: "Store Owner",
    });
    const fetchUsers = async () => {
        const res = await api.get("/users");
        setUsers(res.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);
    return (
        <MainLayout>
            <div className="space-y-5">

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Users</h1>
                        <p className="text-sm text-gray-500">
                            Manage platform users
                        </p>
                    </div>

                    <button
                        onClick={() => setOpen(true)}
                        className="hidden sm:flex items-center gap-2 rounded-lg bg-teal-500 px-4 py-2 text-white"
                    >
                        <CirclePlus size={18} />
                        Add User
                    </button>
                </div>

                <div className="relative">
                    <Search
                        className="absolute left-3 top-3 text-gray-400"
                        size={18}
                    />

                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 outline-none focus:border-teal-500"
                    />
                </div>

                {/* Desktop Table */}

                <div className="hidden md:block rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-teal-50">
                            <tr className="text-left text-sm">
                                <th className="p-4">Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Role</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filtered.map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-t hover:bg-gray-50"
                                >
                                    <td className="p-4 font-medium">
                                        {user.name}
                                    </td>

                                    <td>{user.email}</td>

                                    <td>{user.address}</td>

                                    <td>
                                        <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700">
                                            {user.role}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}

                <div className="space-y-3 md:hidden">
                    {filtered.map((user) => (
                        <div
                            key={user.id}
                            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold">{user.name}</h3>

                                <span className="rounded-full bg-teal-100 px-2 py-1 text-xs text-teal-700">
                                    {user.role}
                                </span>
                            </div>

                            <p className="mt-2 text-sm text-gray-600">
                                {user.email}
                            </p>

                            <p className="text-sm text-gray-500">
                                {user.address}
                            </p>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => setOpen(true)}
                    className="fixed bottom-5 right-5 rounded-full bg-teal-500 p-4 text-white shadow-lg sm:hidden"
                >
                    <CirclePlus size={24} />
                </button>

            </div>
            <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                title="Add New User"
            >
                <div className="space-y-4">

                    <Input
                        label="Full Name"
                        icon={User}
                        placeholder="Enter full name"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                    />

                    <Input
                        label="Email"
                        icon={Mail}
                        placeholder="Enter email"
                        value={form.email}
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                    />

                    <Input
                        label="Address"
                        icon={MapPin}
                        placeholder="Enter address"
                        value={form.address}
                        onChange={(e) =>
                            setForm({ ...form, address: e.target.value })
                        }
                    />

                    <Input
                        label="Password"
                        icon={Lock}
                        type="password"
                        placeholder="Create password"
                        value={form.password}
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                        }
                    />

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Role
                        </label>

                        <select
                            value={form.role}
                            onChange={(e) =>
                                setForm({ ...form, role: e.target.value })
                            }
                            className="w-full rounded-lg border border-gray-300 p-2.5 outline-none focus:border-teal-500"
                        >
                            {/* <option>User</option>
                            <option>Admin</option> */}
                            <option>Store Owner</option>
                        </select>
                    </div>

                    <button
                        onClick={async () => {
                            try {
                                const res = await api.post("/users", form);

                                toast.success(res.data.message);

                                setOpen(false);

                                setForm({
                                    name: "",
                                    email: "",
                                    address: "",
                                    password: "",
                                    role: "Store Owner",
                                });

                                fetchUsers();
                            } catch (err) {
                                toast.error(err.response?.data?.message || "Unable to add user");
                            }
                        }}
                        className="w-full rounded-lg bg-teal-500 py-3 font-semibold text-white"
                    >
                        Save User
                    </button>

                </div>
            </Modal>
        </MainLayout>
    );
}

export default Users;