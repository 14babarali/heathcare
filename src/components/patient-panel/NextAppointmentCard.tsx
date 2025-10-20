import { CalendarClock, BadgeCheck } from "lucide-react";

export default function NextAppointmentCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800">Next Appointment</h3>
        <button className="text-white bg-blue-600 hover:bg-blue-700 text-xs px-3 py-2 rounded-md">View Details</button>
      </div>
      <div className="flex items-center gap-4">
        <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face" className="w-12 h-12 rounded-lg object-cover" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-800">Dr. Sarah Ahmed</p>
          <p className="text-xs text-gray-500">Cardiologist</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="inline-flex items-center text-xs px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">
              <CalendarClock className="w-3 h-3 mr-1" /> 10:30 AM, Today
            </span>
            <span className="inline-flex items-center text-xs px-2.5 py-1 rounded-full bg-green-100 text-green-700">
              <BadgeCheck className="w-3 h-3 mr-1" /> Confirmed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
