const RecentAppointments = () => {
  const appointments = [
    {
      id: 1,
      name: "John Smith",
      type: "General Checkup",
      time: "10:30 AM",
      status: "Confirmed",
      statusColor: "text-green-600",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Emily Johnson",
      type: "Dental Cleaning",
      time: "2:00 PM",
      status: "Pending",
      statusColor: "text-yellow-600",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Michael Brown",
      type: "Blood Test",
      time: "4:15 PM",
      status: "Completed",
      statusColor: "text-blue-600",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Appointments</h3>
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <img
              src={appointment.avatar}
              alt={appointment.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-800">{appointment.name}</h4>
              <p className="text-sm text-gray-600">{appointment.type}</p>
              <p className="text-sm text-gray-500">{appointment.time}</p>
            </div>
            <span className={`text-sm font-medium ${appointment.statusColor}`}>
              {appointment.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentAppointments;
