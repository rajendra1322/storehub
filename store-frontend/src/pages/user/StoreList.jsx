import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import api from "../../services/api";
import StarRating from "../../components/StarRating";
import { Store } from "lucide-react";
import { toast } from "sonner";

function StoreList() {
  const [stores, setStores] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchStores = async () => {
    const res = await api.get(
      `/stores?userId=${user.id}`
    );
    setStores(res.data);
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleRating = async (storeId, rating) => {
    try {
      const res = await api.post("/ratings", {
        user_id: user.id,
        store_id: storeId,
        rating,
      });

      toast.success(res.data.message);
      fetchStores();
    } catch {
      toast.error("Unable to save rating");
    }
  };

  return (
    <MainLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold">Stores</h1>
          <p className="text-sm text-gray-500">
            Rate your favourite stores
          </p>
        </div>

       {stores.map((store) => (
  <div
    key={store.id}
    className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
  >
    <div className="flex gap-4">

      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal-100">
        <Store size={28} className="text-teal-600" />
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900">
          {store.name}
        </h3>

        <p className="text-sm text-gray-500">
          {store.address}
        </p>

        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1">
          <span className="text-sm font-medium text-gray-600">
            Overall
          </span>

          <span className="font-bold text-yellow-500">
            ⭐ {Number(store.rating).toFixed(1)}
          </span>
        </div>
      </div>
    </div>

    <div className="mt-4 border-t pt-3">
      <p className="mb-2 text-sm font-medium text-gray-700">
        Your Rating
      </p>

      <StarRating
        value={store.userRating || 0}
        onRate={(star) => handleRating(store.id, star)}
      />
    </div>
  </div>
))}
      </div>
    </MainLayout>
  );
}

export default StoreList;