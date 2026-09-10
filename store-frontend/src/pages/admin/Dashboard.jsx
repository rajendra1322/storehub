import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import StatCard from "../../components/StatCard";
import api from "../../services/api";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

const ROLE_COLORS = {
  User: "#14b8a6",
  "Store Owner": "#0f766e",
  Admin: "#99f6e4",
};

function Dashboard() {
    const [data, setData] = useState({
        stats: {},
        recentUsers: [],
        ratingChart: [],
        roleChart: [],
        topStores: [],
    });

    useEffect(() => {
        api.get("/admin/dashboard").then((res) => {
            setData(res.data);
        });
    }, []);

    return (
        <MainLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <p className="text-gray-500">
                        Platform overview and analytics
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                    <StatCard
                        title="Users"
                        value={data.stats.totalUsers || 0}
                        type="users"
                    />

                    <StatCard
                        title="Stores"
                        value={data.stats.totalStores || 0}
                        type="stores"
                    />

                    <StatCard
                        title="Ratings"
                        value={data.stats.totalRatings || 0}
                        type="ratings"
                    />
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                    <div className="rounded-2xl border bg-white p-5 shadow-sm">
                        <h2 className="mb-4 font-semibold">
                            Ratings Distribution
                        </h2>

                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data.ratingChart}>
                                    <XAxis dataKey="rating" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar
                                        dataKey="total"
                                        fill="#14b8a6"
                                        radius={[6, 6, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                   
                    <div className="rounded-2xl border bg-white p-5 shadow-sm">
                        <h2 className="mb-4 font-semibold">User Roles</h2>

                        <div className="flex items-center justify-between">
                            <div className="h-64 w-60">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={data.roleChart}
                                            dataKey="total"
                                            nameKey="role"
                                            outerRadius={100}
                                        >
                                            {data.roleChart.map((entry, index) => (
                                                <Cell
                                                    key={index}
                                                    fill={ROLE_COLORS[entry.role]}
                                                />
                                            ))}
                                        </Pie>

                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Color Legend */}
                            <div className="space-y-3">
                                {data.roleChart.map((role) => (
                                    <div
                                        key={role.role}
                                        className="flex items-center gap-2"
                                    >
                                        <div
                                            className="h-4 w-4 rounded-full"
                                            style={{
                                                backgroundColor: ROLE_COLORS[role.role],
                                            }}
                                        />

                                        <div>
                                            <p className="text-sm font-medium">{role.role}</p>
                                            <p className="text-xs text-gray-500">
                                                {role.total} users
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border bg-white p-5 shadow-sm">
                    <h2 className="mb-4 font-semibold">
                        Top Rated Stores
                    </h2>

                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={data.topStores}
                                layout="vertical"
                            >
                                <XAxis type="number" domain={[0, 5]} />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    width={110}
                                />
                                <Tooltip />
                                <Bar
                                    dataKey="rating"
                                    fill="#0f766e"
                                    radius={[0, 6, 6, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="rounded-2xl border bg-white p-5 shadow-sm">
                    <h2 className="mb-4 font-semibold">
                        Recent Users
                    </h2>

                    <div className="space-y-3">
                        {data.recentUsers.map((user) => (
                            <div
                                key={user.id}
                                className="flex items-center justify-between border-b pb-3 last:border-0"
                            >
                                <div>
                                    <p className="font-medium">{user.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {user.email}
                                    </p>
                                </div>

                                <span className="rounded-full bg-teal-100 px-3 py-1 text-xs text-teal-700">
                                    {user.role}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default Dashboard;