import { Users, Store, Star } from "lucide-react";

const icons = {
  users: Users,
  stores: Store,
  ratings: Star,
};

function StatCard({ title, value, type }) {
  const Icon = icons[type];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-teal-50">
        <Icon size={22} className="text-teal-600" />
      </div>

      <p className="text-sm text-gray-500">{title}</p>

      <h2 className="mt-1 text-2xl font-bold text-gray-900">{value}</h2>
    </div>
  );
}

export default StatCard;