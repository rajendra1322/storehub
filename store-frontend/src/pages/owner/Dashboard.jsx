import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import api from "../../services/api";
import { Star, Users, Store } from "lucide-react";

function Dashboard() {
  const [data, setData] = useState({ summary: [], reviews: [] });
  const owner = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    api.get(`/owner/${owner.id}`).then((res) => setData(res.data));
  }, []);

  const totalStores = data.summary.length;
  const totalReviews = data.summary.reduce(
    (sum, s) => sum + Number(s.totalReviews),
    0
  );

  const avgRating =
    totalStores === 0
      ? "0.0"
      : (
          data.summary.reduce(
            (sum, s) => sum + Number(s.averageRating),
            0
          ) / totalStores
        ).toFixed(1);

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Store Owner Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome back, {owner.name}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-white border border-gray-200 p-4 shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-yellow-100 flex items-center justify-center">
              <Star className="text-yellow-500" size={20} />
            </div>
            <h2 className="text-2xl font-bold mt-3">{avgRating}</h2>
            <p className="text-sm text-gray-500">Average Rating</p>
          </div>

          <div className="rounded-2xl bg-white border border-gray-200 p-4 shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-teal-100 flex items-center justify-center">
              <Users className="text-teal-600" size={20} />
            </div>
            <h2 className="text-2xl font-bold mt-3">{totalReviews}</h2>
            <p className="text-sm text-gray-500">Total Reviews</p>
          </div>

          <div className="rounded-2xl bg-white border border-gray-200 p-4 shadow-sm col-span-2 md:col-span-1">
            <div className="h-10 w-10 rounded-xl bg-teal-100 flex items-center justify-center">
              <Store className="text-teal-600" size={20} />
            </div>
            <h2 className="text-2xl font-bold mt-3">{totalStores}</h2>
            <p className="text-sm text-gray-500">My Stores</p>
          </div>
        </div>

        {/* My Stores */}
        <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5">
          <h2 className="text-lg font-semibold mb-4">My Stores</h2>

          <div className="space-y-3">
            {data.summary.map((store) => (
              <div
                key={store.id}
                className="flex items-center justify-between rounded-xl border border-gray-100 p-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-teal-100 flex items-center justify-center">
                    <Store className="text-teal-600" size={20} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {store.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {store.totalReviews} Reviews
                    </p>
                  </div>
                </div>

                <div className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                  ⭐ {store.averageRating}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5">
          <h2 className="text-lg font-semibold mb-4">Recent Reviews</h2>

          <div className="space-y-3">
            {data.reviews.map((review, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-gray-100 p-3"
              >
                <div>
                  <h3 className="font-medium">{review.name}</h3>
                  <p className="text-sm text-gray-500">{review.email}</p>
                </div>

                <div className="font-semibold text-yellow-500">
                  ⭐ {review.rating}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;