import { Users } from "lucide-react";

function StatCard({ title, value }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <Users className="text-teal-500 mb-2" />

      <p className="text-sm text-gray-500">{title}</p>

      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  );
}

export default StatCard;