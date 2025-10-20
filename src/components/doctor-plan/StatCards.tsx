import { CheckCircle2, Clock3, XCircle, CalendarDays } from "lucide-react";

const StatCard = ({ title, value, color, icon }: { title: string; value: string | number; color: string; icon: React.ReactNode }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-4`}> 
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Total Appointments" value={24} color="bg-blue-100 text-blue-600" icon={<CalendarDays className="w-5 h-5" />} />
      <StatCard title="Completed" value={18} color="bg-green-100 text-green-600" icon={<CheckCircle2 className="w-5 h-5" />} />
      <StatCard title="Pending" value={4} color="bg-yellow-100 text-yellow-600" icon={<Clock3 className="w-5 h-5" />} />
      <StatCard title="Canceled" value={2} color="bg-red-100 text-red-600" icon={<XCircle className="w-5 h-5" />} />
    </div>
  );
}
