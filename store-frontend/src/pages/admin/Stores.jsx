import { useEffect, useState } from "react";
import api from "../../services/api";
import MainLayout from "../../layouts/MainLayout";
import { Search, CirclePlus, Star } from "lucide-react";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import { Store, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";



function Stores() {
    const [stores, setStores] = useState([]);
    const [owners, setOwners] = useState([]);
    const [search, setSearch] = useState("");

    const filtered = stores.filter((store) =>
        `${store.name} ${store.email} ${store.address}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );
    const [open, setOpen] = useState(false);

    const [storeForm, setStoreForm] = useState({
        name: "",
        email: "",
        address: "",
        owner: "",
    });

    const fetchStores = async () => {
        const res = await api.get("/stores");
        setStores(res.data);
    };

    const fetchOwners = async () => {
        const res = await api.get("/users");
        const onlyOwners = res.data.filter(
            (u) => u.role === "Store Owner"
        );
        setOwners(onlyOwners);
    };

    useEffect(() => {
        fetchStores();
        fetchOwners();
    }, []);

    return (
        <MainLayout>
            <div className="space-y-5">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Stores</h1>
                        <p className="text-sm text-gray-500">
                            Manage registered stores
                        </p>
                    </div>

                    <button onClick={() => setOpen(true)} className="hidden sm:flex items-center gap-2 rounded-lg bg-teal-500 px-4 py-2 text-white hover:bg-teal-600">
                        <CirclePlus size={18} />
                        Add Store
                    </button>
                </div>

                <div className="relative">
                    <Search
                        size={18}
                        className="absolute left-3 top-3 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search stores..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 outline-none focus:border-teal-500"
                    />
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <table className="w-full">
                        <thead className="bg-teal-50">
                            <tr className="text-left text-sm">
                                <th className="p-4">Store</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Rating</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filtered.map((store) => (
                                <tr
                                    key={store.id}
                                    className="border-t hover:bg-gray-50"
                                >
                                    <td className="p-4 font-medium">{store.name}</td>
                                    <td>{store.email}</td>
                                    <td>{store.address}</td>

                                    <td>
                                        <div className="flex items-center gap-1">
                                            <Star
                                                size={16}
                                                className="fill-yellow-400 text-yellow-400"
                                            />
                                            {store.rating}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="space-y-3 md:hidden">
                    {filtered.map((store) => (
                        <div
                            key={store.id}
                            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold">{store.name}</h3>

                                <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-1">
                                    <Star
                                        size={14}
                                        className="fill-yellow-400 text-yellow-400"
                                    />
                                    <span className="text-xs font-medium">
                                        {store.rating}
                                    </span>
                                </div>
                            </div>

                            <p className="mt-2 text-sm text-gray-600">
                                {store.email}
                            </p>

                            <p className="text-sm text-gray-500">
                                {store.address}
                            </p>
                        </div>
                    ))}
                </div>

                <button onClick={() => setOpen(true)} className="fixed bottom-5 right-5 rounded-full bg-teal-500 p-4 text-white shadow-lg sm:hidden">
                    <CirclePlus size={24} />
                </button>
            </div>
            <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                title="Add Store"
            >
                <div className="space-y-4">

                    <Input
                        label="Store Name"
                        icon={Store}
                        placeholder="Enter store name"
                        value={storeForm.name}
                        onChange={(e) =>
                            setStoreForm({ ...storeForm, name: e.target.value })
                        }
                    />

                    <Input
                        label="Email"
                        icon={Mail}
                        placeholder="Enter email"
                        value={storeForm.email}
                        onChange={(e) =>
                            setStoreForm({ ...storeForm, email: e.target.value })
                        }
                    />

                    <Input
                        label="Address"
                        icon={MapPin}
                        placeholder="Enter address"
                        value={storeForm.address}
                        onChange={(e) =>
                            setStoreForm({ ...storeForm, address: e.target.value })
                        }
                    />

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Store Owner
                        </label>

                        <select
                            className="w-full rounded-lg border border-gray-300 p-2.5"
                            value={storeForm.owner}
                            onChange={(e) =>
                                setStoreForm({ ...storeForm, owner: e.target.value })
                            }
                        >
                            <option value="">Select Owner</option>

                            {owners.map((owner) => (
                                <option key={owner.id} value={owner.id}>
                                    {owner.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={async () => {
                            try {
                                const res = await api.post("/stores", {
                                    name: storeForm.name,
                                    email: storeForm.email,
                                    address: storeForm.address,
                                    owner_id: storeForm.owner,
                                });

                                toast.success(res.data.message);

                                setOpen(false);

                                setStoreForm({
                                    name: "",
                                    email: "",
                                    address: "",
                                    owner: "",
                                });

                                fetchStores();
                            } catch (err) {
                                toast.error(
                                    err.response?.data?.message || "Unable to add store"
                                );
                            }
                        }}
                        className="w-full rounded-lg bg-teal-500 py-3 font-semibold text-white"
                    >
                        Save Store
                    </button>

                </div>
            </Modal>
        </MainLayout>
    );
}

export default Stores;