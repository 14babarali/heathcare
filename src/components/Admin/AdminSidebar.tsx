import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Users, 
  Calendar, 
  Mail, 
  BarChart3, 
  Settings as Cog, 
  Heart 
} from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

const AdminSidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const role = user?.role || "Patient";

  const adminMenu = [
    { name: "Dashboard", icon: <Home className="w-5 h-5" />, path: "/Administrator" },
    { name: "Patients", icon: <Users className="w-5 h-5" />, path: "/Administrator/patients" },
    { name: "Appointments", icon: <Calendar className="w-5 h-5" />, path: "/Administrator/appointments" },
    { name: "Messages", icon: <Mail className="w-5 h-5" />, path: "/Administrator/messages" },
    { name: "Reports", icon: <BarChart3 className="w-5 h-5" />, path: "/Administrator/reports" },
    { name: "Settings", icon: <Cog className="w-5 h-5" />, path: "/Administrator/settings" },
  ];

  const doctorMenu = [
    { name: "Dashboard", icon: <Home className="w-5 h-5" />, path: "/Doctor" },
    { name: "Appointments", icon: <Calendar className="w-5 h-5" />, path: "/Doctor/appointments" },
    { name: "Messages", icon: <Mail className="w-5 h-5" />, path: "/Doctor/messages" },
    { name: "Reports", icon: <BarChart3 className="w-5 h-5" />, path: "/Doctor/reports" },
    { name: "Settings", icon: <Cog className="w-5 h-5" />, path: "/Administrator/settings" },
  ];

  const patientMenu = [
    { name: "Dashboard", icon: <Home className="w-5 h-5" />, path: "/Patient" },
    { name: "Appointments", icon: <Calendar className="w-5 h-5" />, path: "/Patient/appointments" },
    { name: "Messages", icon: <Mail className="w-5 h-5" />, path: "/Patient/messages" },
    { name: "Settings", icon: <Cog className="w-5 h-5" />, path: "/Administrator/settings" },
  ];

  const menu = role === "Administrator" ? adminMenu : role === "Doctor" ? doctorMenu : patientMenu;

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
            <p className="text-sm text-gray-500">{role} Portal</p>
          </div>
        </div>
      </div>
      
      {/* Navigation Menu */}
      <nav className="mt-2">
        {menu.map((item) => {
          const active = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-6 py-4 hover:bg-blue-50 transition-colors ${active ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-600"}`}
            >
              <span className={`mr-4 ${active ? "text-blue-600" : "text-gray-600"}`}>{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminSidebar;
