import { Users, Calendar, X, Mail } from "lucide-react";

const MetricCards = () => {
  const metrics = [
    {
      title: "Total Patients",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: (
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <Users className="w-6 h-6 text-blue-600" />
        </div>
      ),
    },
    {
      title: "Upcoming Appointments",
      value: "28",
      change: "+8%",
      trend: "up",
      icon: (
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
          <Calendar className="w-6 h-6 text-green-600" />
        </div>
      ),
    },
    {
      title: "Canceled Appointments",
      value: "5",
      change: "-3%",
      trend: "down",
      icon: (
        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
          <X className="w-6 h-6 text-red-600" />
        </div>
      ),
    },
    {
      title: "New Messages",
      value: "12",
      change: "+5%",
      trend: "up",
      icon: (
        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
          <Mail className="w-6 h-6 text-yellow-600" />
        </div>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              <div className="flex items-center mt-2">
                <span className={`text-sm font-medium ${
                  metric.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  {metric.trend === "up" ? "↗" : "↘"} {metric.change}
                </span>
              </div>
            </div>
            {metric.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricCards;
