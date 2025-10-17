import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Users, 
  Calendar, 
  Mail, 
  BarChart3, 
  Settings, 
  Heart 
} from "lucide-react";

const AdminSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { 
      name: "Dashboard", 
      icon: <Home className="w-5 h-5" />, 
      path: "/Administrator", 
      active: false 
    },
    { 
      name: "Patients", 
      icon: <Users className="w-5 h-5" />, 
      path: "/Administrator/patients", 
      active: false 
    },
    { 
      name: "Appointments", 
      icon: <Calendar className="w-5 h-5" />, 
      path: "/Administrator/appointments", 
      active: false 
    },
    { 
      name: "Messages", 
      icon: <Mail className="w-5 h-5" />, 
      path: "/Administrator/messages", 
      active: false 
    },
    { 
      name: "Reports", 
      icon: <BarChart3 className="w-5 h-5" />, 
      path: "/Administrator/reports", 
      active: false 
    },
    { 
      name: "Settings", 
      icon: <Settings className="w-5 h-5" />, 
      path: "/Administrator/settings", 
      active: true 
    },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen">
      {/* Logo Section */}
      <div className="p-6">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">HealthCare</h2>
            <p className="text-sm text-gray-500">Admin Portal</p>
          </div>
        </div>
      </div>
      
      {/* Navigation Menu */}
      <nav className="mt-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center px-6 py-4 text-gray-700 hover:bg-blue-50 transition-colors ${
              item.active 
                ? "bg-blue-50 text-blue-600 font-semibold" 
                : "text-gray-600"
            }`}
          >
            <span className={`mr-4 ${item.active ? "text-blue-600" : "text-gray-600"}`}>
              {item.icon}
            </span>
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
