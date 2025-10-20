import { BadgeCheck } from "lucide-react";

const Row = ({ avatar, name, problem, time, status }: { avatar: string; name: string; problem: string; time: string; status: "Pending" | "Confirmed" }) => {
  return (
    <div className="grid grid-cols-12 items-center py-3 px-4 hover:bg-gray-50 rounded-lg">
      <div className="col-span-4 flex items-center gap-3">
        <img src={avatar} alt={name} className="w-8 h-8 rounded-full object-cover" />
        <div>
          <p className="text-sm font-medium text-gray-800">{name}</p>
          <p className="text-xs text-gray-500">{problem}</p>
        </div>
      </div>
      <div className="col-span-2 text-sm text-gray-700">{time}</div>
      <div className="col-span-3">
        <span className={`inline-flex items-center text-xs px-2.5 py-1 rounded-full ${status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
          {status}
        </span>
      </div>
      <div className="col-span-3 text-right">
        <button className="text-white bg-blue-600 hover:bg-blue-700 text-xs px-3 py-2 rounded-md">View Details</button>
      </div>
    </div>
  );
};

export default function UpcomingAppointmentsTable() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-5 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Upcoming Appointments</h3>
      </div>
      <div className="px-2 py-3">
        <div className="hidden lg:grid grid-cols-12 text-xs text-gray-500 px-4 pb-2">
          <div className="col-span-4">Patient Name</div>
          <div className="col-span-2">Time</div>
          <div className="col-span-3">Status</div>
          <div className="col-span-3 text-right">Action</div>
        </div>
        <div className="space-y-2">
          <Row avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" name="John Smith" problem="Chest Pain" time="10:30 AM" status="Pending" />
          <Row avatar="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face" name="Emily Davis" problem="Regular Checkup" time="2:00 PM" status="Confirmed" />
        </div>
      </div>
    </div>
  );
}
